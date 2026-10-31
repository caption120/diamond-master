import { DetectedImage, ExtensionSettings } from '../types';
import { QualityEngine } from './qualityEngine';
import { isEligibleJewelryImage } from './filter';
import { extractUniversalVideos } from './videoExtractor';
import { scanInstagramPosts } from './instagramScanner';

let imageCounter = 0;

/**
 * Universal, high-performance scanner that indexes jewelry photos, studio masters & video reels.
 * Scans standard images, responsive picture sources, CSS backgrounds, shadow roots, and SPA script state.
 */
export function scanPageForImages(settings: ExtensionSettings): DetectedImage[] {
  const detectedMap = new Map<string, DetectedImage>();

  const isInstagram = typeof window !== 'undefined' && window.location && window.location.hostname.includes('instagram.com');

  // If on Instagram, use the dedicated, zero-noise Instagram post & reel scanner
  if (isInstagram) {
    scanInstagramPosts(detectedMap);
    return Array.from(detectedMap.values());
  }

  const filterOptions = {
    minWidth: settings.minSize || 80,
    minHeight: settings.minSize || 80,
    ignoreLogos: true,
    ignoreSvg: true
  };

  // 1. Scan standard <img> tags across DOM (and open shadow roots)
  const imgElements = collectAllElements<HTMLImageElement>('img');
  for (let i = 0; i < imgElements.length; i++) {
    processImageElement(imgElements[i], filterOptions, detectedMap);
  }

  // 2. Scan <picture> and <source> elements (responsive jewelry galleries & banners)
  const sourceElements = collectAllElements<HTMLSourceElement>('picture source, source[srcset]');
  for (let i = 0; i < sourceElements.length; i++) {
    processSourceElement(sourceElements[i], filterOptions, detectedMap);
  }

  // 3. Scan elements with CSS background-image
  const bgCandidates = collectAllElements<HTMLElement>(
    '[style*="background"], [style*="url("], [class*="bg-"], [class*="hero"], [class*="gallery"], [class*="slide"], [class*="banner"]'
  );
  for (let i = 0; i < bgCandidates.length; i++) {
    processBackgroundImageElement(bgCandidates[i], filterOptions, detectedMap);
  }

  // 4. Universal Video & Reel Extraction across ANY website (Instagram, Shopify, Etsy, Tanishq, etc.)
  extractUniversalVideos(detectedMap);

  // 5. Deep SPA State Mining (__NEXT_DATA__, JSON-LD Schema, Shopify meta)
  scanScriptStateForMasterImages(filterOptions, detectedMap);

  return Array.from(detectedMap.values());
}

/**
 * Recursively collects elements from the document and all accessible open shadow roots.
 */
function collectAllElements<T extends Element>(selector: string): T[] {
  const results: T[] = Array.from(document.querySelectorAll<T>(selector));

  const allElements = document.querySelectorAll('*');
  for (let i = 0; i < allElements.length; i++) {
    const shadowRoot = allElements[i].shadowRoot;
    if (shadowRoot && allElements[i].id !== 'diamond-clarity-root') {
      try {
        const shadowMatches = shadowRoot.querySelectorAll<T>(selector);
        for (let j = 0; j < shadowMatches.length; j++) {
          results.push(shadowMatches[j]);
        }
      } catch {
        // ignore shadow selector errors
      }
    }
  }

  return results;
}

function processImageElement(
  img: HTMLImageElement,
  filterOptions: any,
  detectedMap: Map<string, DetectedImage>
) {
  let rawCandidate = '';

  // 1. Prioritize raw studio zoom & 4K master attributes FIRST!
  // Jewelry stores place uncompressed 4K master files in data-zoom-image / data-highres,
  // while srcset only contains downscaled responsive mobile sizes.
  const studioMasterCandidate =
    img.getAttribute('data-zoom-image') ||
    img.getAttribute('data-zoom') ||
    img.getAttribute('data-large-img') ||
    img.getAttribute('data-large') ||
    img.getAttribute('data-highres') ||
    img.getAttribute('data-hi-res-src') ||
    img.getAttribute('data-master') ||
    img.getAttribute('data-super-large') ||
    img.getAttribute('data-full-img') ||
    img.getAttribute('data-full-src') ||
    img.getAttribute('data-original') ||
    img.getAttribute('data-original-src');

  if (studioMasterCandidate && !studioMasterCandidate.startsWith('data:')) {
    rawCandidate = studioMasterCandidate;
  }

  // 2. Check responsive srcset if no explicit master attribute was found
  if (!rawCandidate && img.srcset) {
    rawCandidate = QualityEngine.getBestFromSrcset(img.srcset) || '';
  }

  // 3. Check all other lazy load & slider data attributes
  if (!rawCandidate || rawCandidate.startsWith('data:')) {
    const dataSrc =
      img.getAttribute('data-src-zoom') ||
      img.getAttribute('data-desktop-src') ||
      img.getAttribute('data-splide-lazy') ||
      img.getAttribute('data-lazy-src') ||
      img.getAttribute('data-lazy') ||
      img.getAttribute('data-src') ||
      img.getAttribute('data-image-src') ||
      img.getAttribute('data-img-src') ||
      img.getAttribute('data-srcset');

    if (dataSrc) {
      if (dataSrc.includes(' ') && dataSrc.includes(',')) {
        rawCandidate = QualityEngine.getBestFromSrcset(dataSrc) || dataSrc;
      } else {
        rawCandidate = dataSrc;
      }
    }
  }

  // 3. Check browser resolved currentSrc (if not a data URI)
  if ((!rawCandidate || rawCandidate.startsWith('data:')) && img.currentSrc && !img.currentSrc.startsWith('data:')) {
    rawCandidate = img.currentSrc;
  }

  // 4. Check standard src
  if ((!rawCandidate || rawCandidate.startsWith('data:')) && img.src && !img.src.startsWith('data:')) {
    rawCandidate = img.src;
  }

  if (!rawCandidate || rawCandidate.startsWith('data:image/svg')) {
    return;
  }

  const absoluteUrl = QualityEngine.resolveAbsoluteUrl(rawCandidate);

  // Filter out noise, logos, and tiny icons
  if (!isEligibleJewelryImage(img, absoluteUrl, filterOptions)) {
    return;
  }

  // Upgrade to Master Quality via Dedicated QualityEngine
  const upgraded = QualityEngine.upgrade(absoluteUrl, img);
  const masterUrl = upgraded.url;

  if (!masterUrl || detectedMap.has(masterUrl)) return;

  const renderedW = img.offsetWidth || img.getBoundingClientRect().width || 0;
  const renderedH = img.offsetHeight || img.getBoundingClientRect().height || 0;
  const naturalW = img.naturalWidth || renderedW || 0;
  const naturalH = img.naturalHeight || renderedH || 0;

  const maxDimension = Math.max(renderedW, naturalW, naturalH);
  let qualityLabel = upgraded.qualityTier;
  if (upgraded.sourceType === 'tanishq') qualityLabel = 'Tanishq 4K';
  else if (maxDimension >= 2400) qualityLabel = '4K Master';
  else if (maxDimension >= 1800) qualityLabel = 'Ultra HD';
  else if (maxDimension >= 1080) qualityLabel = '1080p Master';
  else if (maxDimension >= 600) qualityLabel = 'High Res';

  const alt = img.getAttribute('alt') || '';
  const id = `diamond-img-${++imageCounter}`;
  const filename = QualityEngine.getSafeFilename(masterUrl, detectedMap.size, alt);

  detectedMap.set(masterUrl, {
    id,
    originalSrc: absoluteUrl,
    masterSrc: masterUrl,
    width: Math.round(renderedW) || 400,
    height: Math.round(renderedH) || 400,
    naturalWidth: naturalW || 1200,
    naturalHeight: naturalH || 1200,
    sourceType: upgraded.sourceType,
    qualityLabel,
    selected: false,
    altText: alt,
    filename,
    element: img,
    mediaType: 'image'
  });
}

function processSourceElement(
  source: HTMLSourceElement,
  filterOptions: any,
  detectedMap: Map<string, DetectedImage>
) {
  const srcset = source.srcset || source.getAttribute('data-srcset');
  if (!srcset) return;

  const bestUrl = QualityEngine.getBestFromSrcset(srcset);
  if (!bestUrl || bestUrl.startsWith('data:image/svg')) return;

  const absoluteUrl = QualityEngine.resolveAbsoluteUrl(bestUrl);
  const upgraded = QualityEngine.upgrade(absoluteUrl, source);
  const masterUrl = upgraded.url;

  if (!masterUrl || detectedMap.has(masterUrl)) return;

  const parentPic = source.closest('picture');
  const imgChild = parentPic?.querySelector('img');
  const alt = imgChild?.getAttribute('alt') || '';

  const id = `diamond-img-${++imageCounter}`;
  const filename = QualityEngine.getSafeFilename(masterUrl, detectedMap.size, alt);

  detectedMap.set(masterUrl, {
    id,
    originalSrc: absoluteUrl,
    masterSrc: masterUrl,
    width: imgChild?.offsetWidth || 800,
    height: imgChild?.offsetHeight || 800,
    naturalWidth: imgChild?.naturalWidth || 1600,
    naturalHeight: imgChild?.naturalHeight || 1600,
    sourceType: upgraded.sourceType,
    qualityLabel: 'Ultra HD',
    selected: false,
    altText: alt,
    filename,
    element: imgChild || (parentPic as HTMLElement),
    mediaType: 'image'
  });
}

function processBackgroundImageElement(
  el: HTMLElement,
  filterOptions: any,
  detectedMap: Map<string, DetectedImage>
) {
  const bg = window.getComputedStyle(el).backgroundImage;
  if (!bg || bg === 'none' || !bg.startsWith('url(')) return;

  const match = bg.match(/url\(['"]?(.*?)['"]?\)/i);
  if (!match || !match[1]) return;

  const rawUrl = match[1];
  if (rawUrl.startsWith('data:') || rawUrl.endsWith('.svg')) return;

  const absoluteUrl = QualityEngine.resolveAbsoluteUrl(rawUrl);

  if (!isEligibleJewelryImage(el, absoluteUrl, filterOptions)) {
    return;
  }

  const upgraded = QualityEngine.upgrade(absoluteUrl, el);
  const masterUrl = upgraded.url;
  if (!masterUrl || detectedMap.has(masterUrl)) return;

  const rect = el.getBoundingClientRect();
  const w = Math.round(rect.width) || 600;
  const h = Math.round(rect.height) || 600;

  const id = `diamond-img-${++imageCounter}`;
  const filename = QualityEngine.getSafeFilename(masterUrl, detectedMap.size, el.title || el.getAttribute('aria-label') || '');

  detectedMap.set(masterUrl, {
    id,
    originalSrc: absoluteUrl,
    masterSrc: masterUrl,
    width: w,
    height: h,
    naturalWidth: w,
    naturalHeight: h,
    sourceType: upgraded.sourceType,
    qualityLabel: w >= 1500 ? 'Ultra HD' : 'High Res',
    selected: false,
    altText: el.title || el.getAttribute('aria-label') || '',
    filename,
    element: el,
    mediaType: 'image'
  });
}

/**
 * Deep SPA State Mining (__NEXT_DATA__, JSON-LD Schema, Shopify meta)
 */
function scanScriptStateForMasterImages(filterOptions: any, detectedMap: Map<string, DetectedImage>) {
  try {
    const scripts = document.querySelectorAll(
      'script[id="__NEXT_DATA__"], script[type="application/ld+json"], script[data-product-json]'
    );

    for (let i = 0; i < scripts.length; i++) {
      const content = scripts[i].textContent;
      if (!content || content.length < 50) continue;

      const matches = content.match(/https?:\/\/[^\s"'<>\\]+?\.(?:jpe?g|png|webp|avif)/gi);
      if (!matches) continue;

      for (let j = 0; j < matches.length; j++) {
        const cleanUrl = matches[j].replace(/\\/g, '');

        if (cleanUrl.includes('logo') || cleanUrl.includes('icon') || cleanUrl.includes('avatar')) {
          continue;
        }

        const upgraded = QualityEngine.upgrade(cleanUrl);
        const masterUrl = upgraded.url;

        if (masterUrl && !detectedMap.has(masterUrl)) {
          const id = `diamond-img-${++imageCounter}`;
          const filename = QualityEngine.getSafeFilename(masterUrl, detectedMap.size, 'jewelry_piece');

          detectedMap.set(masterUrl, {
            id,
            originalSrc: cleanUrl,
            masterSrc: masterUrl,
            width: 1200,
            height: 1200,
            naturalWidth: 2400,
            naturalHeight: 2400,
            sourceType: upgraded.sourceType,
            qualityLabel: '4K Master',
            selected: false,
            altText: 'Catalog Master Image',
            filename,
            mediaType: 'image'
          });
        }
      }
    }
  } catch {
    // Ignore script parsing errors
  }
}
