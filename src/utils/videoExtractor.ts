import { DetectedImage } from '../types';
import { QualityEngine } from './qualityEngine';
import { getSafeFilename } from './cdnRules';

let videoCounter = 0;

/**
 * Universal Video & Reel Extractor:
 * Detects, upgrades, and extracts high-resolution MP4/WebM videos across ANY website:
 * - Instagram Reels & Stories (React Fiber state mining)
 * - Shopify Product Showcase Videos & 360° Turntable Spins
 * - Etsy Listing Videos
 * - Tanishq / Luxury Jewelry Video Banners
 * - HTML5 <video>, <source>, and Schema VideoObjects
 */
export function extractUniversalVideos(detectedMap: Map<string, DetectedImage>) {
  const isInstagram = typeof window !== 'undefined' && window.location.hostname.includes('instagram.com');

  // 1. Scan all <video> elements on the page (Reels, Shopify 360 spins, Etsy videos)
  const videoElements = Array.from(document.querySelectorAll<HTMLVideoElement>('video'));

  for (const video of videoElements) {
    processUniversalVideoElement(video, detectedMap, isInstagram);
  }

  // 2. Scan script tags (JSON-LD VideoObject & Next Data across all websites)
  scanScriptTagsForUniversalVideos(detectedMap);
}

function processUniversalVideoElement(
  video: HTMLVideoElement,
  detectedMap: Map<string, DetectedImage>,
  isInstagram: boolean
) {
  let masterVideoUrl = '';
  const width = video.videoWidth || 1080;
  const height = video.videoHeight || (isInstagram ? 1920 : 1080);
  let poster = video.poster || '';

  // Strategy A: Direct src on video tag (if not blob)
  if (video.src && video.src.startsWith('http') && !video.src.startsWith('blob:')) {
    masterVideoUrl = video.src;
  }

  // Strategy B: Nested <source> tags (Shopify, WordPress, Etsy often put MP4/WebM in <source>)
  if (!masterVideoUrl) {
    const sources = Array.from(video.querySelectorAll('source'));
    for (const s of sources) {
      const srcCandidate = s.src || s.getAttribute('data-src');
      if (srcCandidate && srcCandidate.startsWith('http') && !srcCandidate.startsWith('blob:')) {
        masterVideoUrl = srcCandidate;
        break;
      }
    }
  }

  // Strategy C: Video Data Attributes (Shopify 360 spin players, lazy loaders)
  if (!masterVideoUrl) {
    const dataSrc =
      video.getAttribute('data-src') ||
      video.getAttribute('data-video-url') ||
      video.getAttribute('data-mp4') ||
      video.getAttribute('data-webm') ||
      video.getAttribute('data-orig-src');

    if (dataSrc && dataSrc.startsWith('http') && !dataSrc.startsWith('blob:')) {
      masterVideoUrl = dataSrc;
    }
  }

  // Strategy D: Instagram React Fiber Mining (when Instagram masks video with blob: stream)
  if (isInstagram && (!masterVideoUrl || masterVideoUrl.startsWith('blob:'))) {
    const fiberUrl = extractVideoFromReactFiber(video);
    if (fiberUrl) masterVideoUrl = fiberUrl;

    if (!masterVideoUrl) {
      const parentArticle = video.closest('article') || video.closest('div[role="dialog"]');
      if (parentArticle) {
        const parentFiberUrl = extractVideoFromReactFiber(parentArticle as HTMLElement);
        if (parentFiberUrl) masterVideoUrl = parentFiberUrl;
      }
    }
  }

  if (!masterVideoUrl || masterVideoUrl.startsWith('blob:')) {
    return;
  }

  const absoluteUrl = QualityEngine.resolveAbsoluteUrl(masterVideoUrl);
  if (detectedMap.has(absoluteUrl)) return;

  // Extract poster as thumbnail preview if not present
  if (!poster) {
    const nearestImg = video.parentElement?.querySelector('img');
    if (nearestImg && nearestImg.src) {
      poster = nearestImg.src;
    }
  }

  const id = `diamond-video-${++videoCounter}`;
  const host = typeof window !== 'undefined' ? window.location.hostname.replace('www.', '').split('.')[0] : 'video';
  const ext = absoluteUrl.includes('.webm') ? 'webm' : 'mp4';
  const filename = `${host}_video_1080p_${String(videoCounter).padStart(3, '0')}.${ext}`;

  detectedMap.set(absoluteUrl, {
    id,
    originalSrc: absoluteUrl,
    masterSrc: absoluteUrl,
    width,
    height,
    naturalWidth: width,
    naturalHeight: height,
    sourceType: isInstagram
      ? 'instagram'
      : host.includes('shopify')
      ? 'shopify'
      : host.includes('etsy')
      ? 'etsy'
      : host.includes('tanishq') || host.includes('titan')
      ? 'tanishq'
      : 'standard',
    qualityLabel: isInstagram ? 'Reel 1080p' : 'HD Video',
    selected: false,
    altText: isInstagram ? 'Instagram Master Reel Video' : 'Product Showcase Video',
    filename,
    element: video,
    mediaType: 'video',
    videoPoster: poster
  });
}

/**
 * Mines Instagram's React Fiber Tree to extract raw video_versions objects.
 */
function extractVideoFromReactFiber(element: HTMLElement): string | null {
  try {
    const keys = Object.keys(element);
    const fiberKey = keys.find(
      (k) => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$')
    );
    const propsKey = keys.find((k) => k.startsWith('__reactProps$'));

    if (propsKey) {
      const props = (element as any)[propsKey];
      const found = searchPropsForVideo(props);
      if (found) return found;
    }

    if (fiberKey) {
      let fiber = (element as any)[fiberKey];
      let depth = 0;
      while (fiber && depth < 12) {
        if (fiber.memoizedProps) {
          const found = searchPropsForVideo(fiber.memoizedProps);
          if (found) return found;
        }
        if (fiber.pendingProps) {
          const found = searchPropsForVideo(fiber.pendingProps);
          if (found) return found;
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

function searchPropsForVideo(props: any): string | null {
  if (!props || typeof props !== 'object') return null;

  if (Array.isArray(props.video_versions) && props.video_versions.length > 0) {
    const sorted = [...props.video_versions].sort(
      (a, b) => (b.width || 0) * (b.height || 0) - (a.width || 0) * (a.height || 0)
    );
    if (sorted[0]?.url) return sorted[0].url;
  }

  if (typeof props.videoUrl === 'string' && props.videoUrl.startsWith('http')) {
    return props.videoUrl;
  }
  if (typeof props.playbackUrl === 'string' && props.playbackUrl.startsWith('http')) {
    return props.playbackUrl;
  }

  if (Array.isArray(props.carousel_media)) {
    for (const item of props.carousel_media) {
      if (Array.isArray(item.video_versions) && item.video_versions.length > 0) {
        return item.video_versions[0].url;
      }
    }
  }

  return null;
}

/**
 * Searches JSON-LD scripts for VideoObject contentUrl across all websites.
 */
function scanScriptTagsForUniversalVideos(detectedMap: Map<string, DetectedImage>) {
  try {
    const jsonScripts = document.querySelectorAll(
      'script[type="application/ld+json"], script[id="__NEXT_DATA__"]'
    );

    for (let i = 0; i < jsonScripts.length; i++) {
      const text = jsonScripts[i].textContent;
      if (!text || (!text.includes('contentUrl') && !text.includes('.mp4') && !text.includes('.webm'))) {
        continue;
      }

      const matches = text.match(/https?:\/\/[^\s"'<>\\]+?\.(?:mp4|webm)[^\s"'<>\\]*/gi);
      if (matches) {
        for (let j = 0; j < matches.length; j++) {
          const cleanUrl = matches[j].replace(/\\u0026/g, '&').replace(/\\/g, '');
          if (!detectedMap.has(cleanUrl)) {
            const id = `diamond-video-${++videoCounter}`;
            const isInstagram = typeof window !== 'undefined' && window.location.hostname.includes('instagram.com');
            const ext = cleanUrl.includes('.webm') ? 'webm' : 'mp4';

            detectedMap.set(cleanUrl, {
              id,
              originalSrc: cleanUrl,
              masterSrc: cleanUrl,
              width: 1080,
              height: isInstagram ? 1920 : 1080,
              naturalWidth: 1080,
              naturalHeight: isInstagram ? 1920 : 1080,
              sourceType: isInstagram ? 'instagram' : 'standard',
              qualityLabel: isInstagram ? 'Reel 1080p' : 'HD Video',
              selected: false,
              altText: isInstagram ? 'Instagram Video Reel' : 'Website Product Video',
              filename: `web_video_1080p_${String(videoCounter).padStart(3, '0')}.${ext}`,
              mediaType: 'video'
            });
          }
        }
      }
    }
  } catch {
    // Ignore script errors
  }
}
