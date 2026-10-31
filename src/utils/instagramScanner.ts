import { DetectedImage, CarouselMediaItem } from '../types';
import { QualityEngine } from './qualityEngine';

let instaCounter = 0;

/**
 * Dedicated Instagram Post & Reel Master Scanner.
 * Accurately extracts uncompressed 1080p Reels, Master Photos, and multi-slide Carousels
 * while strictly ignoring commenter avatars, emojis, and dimmed background grid posts.
 */
export function scanInstagramPosts(detectedMap: Map<string, DetectedImage>) {
  if (typeof window === 'undefined' || !window.location.hostname.includes('instagram.com')) {
    return;
  }

  // 1. Post Modal Dialog Isolation Check:
  // If an active post dialog is open, focus ONLY on the dialog to eliminate background clutter
  const postDialog = Array.from(
    document.querySelectorAll<HTMLElement>('div[role="dialog"], div[aria-modal="true"]')
  ).find((dialog) => dialog.querySelector('video, div._aagv, div._aagu, article'));

  if (postDialog) {
    processInstagramContainer(postDialog, detectedMap, true);
    return;
  }

  // 2. Feed & Standalone Single Page Post Scanning
  let postContainers = Array.from(document.querySelectorAll<HTMLElement>('article'));
  if (postContainers.length === 0) {
    // If no <article> tags, check for standalone reels/posts or section containers
    postContainers = Array.from(
      document.querySelectorAll<HTMLElement>(
        'div[data-pressable-container="true"], div._aa61, main[role="main"] section'
      )
    );
  }

  for (const container of postContainers) {
    // Skip if inside any modal dialog
    if (
      container.closest('div[role="dialog"]') ||
      container.closest('div[aria-modal="true"]')
    ) {
      continue;
    }
    processInstagramContainer(container, detectedMap, false);
  }
}

function processInstagramContainer(
  container: HTMLElement,
  detectedMap: Map<string, DetectedImage>,
  isModal: boolean
) {
  // Check if this container or post was already registered
  const containerId = (container as any).__dm_processed_id;
  if (containerId && detectedMap.has(containerId)) {
    return;
  }

  // Extract post metadata from React Fiber tree
  const fiberPost = extractPostFromFiber(container);

  // Strategy 1: Carousel Post (Multiple Photos / Videos combined)
  if (fiberPost && Array.isArray(fiberPost.carousel_media) && fiberPost.carousel_media.length > 1) {
    const carouselItems: CarouselMediaItem[] = [];

    for (let i = 0; i < fiberPost.carousel_media.length; i++) {
      const slide = fiberPost.carousel_media[i];
      let slideUrl = '';
      let slideType: 'image' | 'video' = 'image';

      if (Array.isArray(slide.video_versions) && slide.video_versions.length > 0) {
        slideType = 'video';
        const sortedVideos = [...slide.video_versions].sort(
          (a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0)
        );
        slideUrl = sortedVideos[0]?.url || '';
      } else if (slide.image_versions2 && Array.isArray(slide.image_versions2.candidates)) {
        slideType = 'image';
        const sortedImages = [...slide.image_versions2.candidates].sort(
          (a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0)
        );
        slideUrl = sortedImages[0]?.url || '';
      }

      if (slideUrl) {
        const ext = slideType === 'video' ? 'mp4' : 'jpg';
        carouselItems.push({
          url: slideUrl,
          mediaType: slideType,
          filename: `instagram_carousel_slide_${i + 1}.${ext}`,
          width: 1080,
          height: 1080
        });
      }
    }

    if (carouselItems.length > 0) {
      const primary = carouselItems[0];
      const mediaEl = findPrimaryMediaElement(container) || container;
      const id = `insta-carousel-${++instaCounter}`;
      (container as any).__dm_processed_id = primary.url;

      detectedMap.set(primary.url, {
        id,
        originalSrc: primary.url,
        masterSrc: primary.url,
        width: 1080,
        height: 1080,
        naturalWidth: 1080,
        naturalHeight: 1080,
        sourceType: 'instagram',
        qualityLabel: `Carousel (${carouselItems.length})`,
        selected: false,
        altText: `Instagram Carousel Post (${carouselItems.length} items)`,
        filename: `instagram_post_carousel_${instaCounter}.${primary.mediaType === 'video' ? 'mp4' : 'jpg'}`,
        element: mediaEl,
        mediaType: primary.mediaType,
        videoPoster: carouselItems.find((c) => c.mediaType === 'image')?.url,
        carouselItems
      });
      return;
    }
  }

  // Strategy 2: Video / Reel (HTML5 <video> or Fiber video_versions)
  const videoEl = container.querySelector<HTMLVideoElement>('video');
  let reelVideoUrl = '';
  let reelCoverUrl = '';

  if (fiberPost && Array.isArray(fiberPost.video_versions) && fiberPost.video_versions.length > 0) {
    const sorted = [...fiberPost.video_versions].sort(
      (a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0)
    );
    reelVideoUrl = sorted[0]?.url || '';

    if (fiberPost.image_versions2 && Array.isArray(fiberPost.image_versions2.candidates)) {
      reelCoverUrl = fiberPost.image_versions2.candidates[0]?.url || '';
    }
  }

  if (!reelVideoUrl && videoEl) {
    if (videoEl.src && !videoEl.src.startsWith('blob:')) {
      reelVideoUrl = videoEl.src;
    } else {
      const srcEl = videoEl.querySelector<HTMLSourceElement>('source');
      if (srcEl && srcEl.src && !srcEl.src.startsWith('blob:')) {
        reelVideoUrl = srcEl.src;
      } else {
        reelVideoUrl =
          extractVideoFromFiber(videoEl) ||
          (videoEl.parentElement ? extractVideoFromFiber(videoEl.parentElement) : null) ||
          '';
      }
    }
  }

  if (videoEl && !reelCoverUrl) {
    reelCoverUrl = videoEl.poster || '';
    if (!reelCoverUrl) {
      const posterImg = container.querySelector<HTMLImageElement>('div._aagv img, img._aamu');
      if (posterImg && posterImg.src) {
        reelCoverUrl = QualityEngine.upgrade(posterImg.src).url;
      }
    }
  }

  if (reelVideoUrl && !reelVideoUrl.startsWith('blob:')) {
    const mediaEl = videoEl?.parentElement || findPrimaryMediaElement(container) || container;
    const id = `insta-reel-${++instaCounter}`;
    (container as any).__dm_processed_id = reelVideoUrl;

    detectedMap.set(reelVideoUrl, {
      id,
      originalSrc: reelVideoUrl,
      masterSrc: reelVideoUrl,
      width: videoEl?.videoWidth || 1080,
      height: videoEl?.videoHeight || 1920,
      naturalWidth: 1080,
      naturalHeight: 1920,
      sourceType: 'instagram',
      qualityLabel: 'Reel 1080p',
      selected: false,
      altText: 'Instagram 1080p Reel Video',
      filename: `instagram_reel_1080p_${instaCounter}.mp4`,
      element: mediaEl,
      mediaType: 'video',
      videoPoster: reelCoverUrl,
      isReel: true
    });
    return;
  }

  // Strategy 3: Single Master Photo
  let photoUrl = '';
  if (fiberPost && fiberPost.image_versions2 && Array.isArray(fiberPost.image_versions2.candidates)) {
    photoUrl = fiberPost.image_versions2.candidates[0]?.url || '';
  }

  const mainPhotoImg = container.querySelector<HTMLImageElement>('div._aagv img, div._aagu img');
  if (!photoUrl && mainPhotoImg && mainPhotoImg.src) {
    // Ensure it's not an avatar or comment image
    if (!mainPhotoImg.alt?.toLowerCase().includes('profile picture') && !mainPhotoImg.src.includes('/t51.2885-19/')) {
      photoUrl = QualityEngine.upgrade(mainPhotoImg.src, mainPhotoImg).url;
    }
  }

  if (photoUrl && !photoUrl.includes('/t51.2885-19/')) {
    const mediaEl = mainPhotoImg?.parentElement || findPrimaryMediaElement(container) || container;
    const id = `insta-photo-${++instaCounter}`;
    (container as any).__dm_processed_id = photoUrl;

    detectedMap.set(photoUrl, {
      id,
      originalSrc: photoUrl,
      masterSrc: photoUrl,
      width: 1080,
      height: 1350,
      naturalWidth: 1080,
      naturalHeight: 1350,
      sourceType: 'instagram',
      qualityLabel: 'Photo 1080p',
      selected: false,
      altText: 'Instagram Master Photo',
      filename: `instagram_photo_1080p_${instaCounter}.jpg`,
      element: mediaEl,
      mediaType: 'image'
    });
  }
}

/**
 * Finds the media viewport container within an Instagram post (for badge placement).
 */
function findPrimaryMediaElement(container: HTMLElement): HTMLElement | null {
  const mediaWrap = container.querySelector<HTMLElement>(
    'div._aagv, div._aagu, div._ab1b, div[role="button"]:has(video), div[role="button"]:has(img)'
  );
  if (mediaWrap) return mediaWrap;

  const video = container.querySelector<HTMLElement>('video');
  if (video && video.parentElement) return video.parentElement;

  const img = container.querySelector<HTMLElement>('img:not([alt*="profile picture"])');
  if (img && img.parentElement) return img.parentElement;

  return null;
}

/**
 * Mines Instagram React Fiber tree to extract full Post / Reel / Carousel metadata.
 */
function extractPostFromFiber(element: HTMLElement): any {
  try {
    const keys = Object.keys(element);
    const fiberKey = keys.find(
      (k) => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$')
    );
    const propsKey = keys.find((k) => k.startsWith('__reactProps$'));

    if (propsKey) {
      const props = (element as any)[propsKey];
      const post = findPostObject(props);
      if (post) return post;
    }

    if (fiberKey) {
      let fiber = (element as any)[fiberKey];
      let depth = 0;
      while (fiber && depth < 16) {
        if (fiber.memoizedProps) {
          const post = findPostObject(fiber.memoizedProps);
          if (post) return post;
        }
        if (fiber.pendingProps) {
          const post = findPostObject(fiber.pendingProps);
          if (post) return post;
        }
        fiber = fiber.return;
        depth++;
      }
    }
  } catch {
    // Ignore fiber traversal exceptions
  }
  return null;
}

function findPostObject(props: any): any {
  if (!props || typeof props !== 'object') return null;

  if (props.post && typeof props.post === 'object') return props.post;
  if (props.item && typeof props.item === 'object') return props.item;
  if (props.media && typeof props.media === 'object') return props.media;
  if (props.clip && typeof props.clip === 'object') return props.clip;
  if (props.video && typeof props.video === 'object') return props.video;

  if (Array.isArray(props.video_versions) || Array.isArray(props.carousel_media)) {
    return props;
  }

  if (props.children && typeof props.children === 'object') {
    if (props.children.props) {
      const sub = findPostObject(props.children.props);
      if (sub) return sub;
    }
  }

  return null;
}

function extractVideoFromFiber(element: HTMLElement): string | null {
  const post = extractPostFromFiber(element);
  if (post && Array.isArray(post.video_versions) && post.video_versions.length > 0) {
    const sorted = [...post.video_versions].sort(
      (a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0)
    );
    return sorted[0]?.url || null;
  }
  return null;
}
