import { ImageSourceType } from '../types';

export interface UpgradedImageResult {
  url: string;
  sourceType: ImageSourceType;
  isUpgraded: boolean;
}

/**
 * Parses and extracts the highest-resolution candidate from an HTML srcset string.
 */
export function getBestFromSrcset(srcset: string): string | null {
  if (!srcset || typeof srcset !== 'string') return null;

  const entries = srcset
    .split(',')
    .map(entry => entry.trim())
    .filter(Boolean);

  let bestUrl: string | null = null;
  let maxWeight = 0;

  for (const entry of entries) {
    const parts = entry.split(/\s+/);
    const url = parts[0];
    const descriptor = parts[1] || '';

    let weight = 1;
    if (descriptor.endsWith('w')) {
      weight = parseInt(descriptor.slice(0, -1), 10) || 1;
    } else if (descriptor.endsWith('x')) {
      weight = parseFloat(descriptor.slice(0, -1)) * 1000 || 1;
    }

    if (weight > maxWeight) {
      maxWeight = weight;
      bestUrl = url;
    }
  }

  return bestUrl;
}

/**
 * Deep inspection and upgrade of an image URL to find the absolute master uncompressed source.
 */
export function upgradeImageUrl(rawUrl: string, element?: HTMLElement): UpgradedImageResult {
  if (!rawUrl) {
    return { url: '', sourceType: 'standard', isUpgraded: false };
  }

  let url = rawUrl.trim();
  const currentHost = typeof window !== 'undefined' && window.location ? window.location.hostname : '';
  const currentHref = typeof window !== 'undefined' && window.location ? window.location.href : 'http://localhost';

  // 1. Check parent <a> lightbox link or zoom attributes on element first
  if (element) {
    const zoomAttrs = [
      'data-zoom-image',
      'data-zoom',
      'data-large-img',
      'data-large',
      'data-original',
      'data-src-zoom',
      'data-highres',
      'data-master',
      'data-full-img',
      'data-full',
      'data-orig-file'
    ];

    for (const attr of zoomAttrs) {
      const val = element.getAttribute(attr);
      if (val && val.trim().length > 5 && !val.startsWith('data:')) {
        return {
          url: resolveAbsoluteUrl(val.trim()),
          sourceType: 'zoom',
          isUpgraded: true
        };
      }
    }

    // Check enclosing anchor tag (e.g. <a href="full-res-ring.jpg"><img src="thumb.jpg"></a>)
    const anchor = element.closest('a');
    if (anchor && anchor.href) {
      const anchorHref = anchor.href.trim();
      if (/\.(jpe?g|png|webp|avif)(\?.*)?$/i.test(anchorHref)) {
        return {
          url: anchorHref,
          sourceType: 'zoom',
          isUpgraded: true
        };
      }
    }
  }

  // 2. Etsy Master Rule:
  // Replaces thumbnail patterns like il_340x270, il_794xN, il_1588xN with il_fullxfull
  if (url.includes('etsystatic.com')) {
    const etsyRegex = /\/il_\d+x[0-9N]+\./i;
    if (etsyRegex.test(url)) {
      const upgraded = url.replace(etsyRegex, '/il_fullxfull.');
      return { url: upgraded, sourceType: 'etsy', isUpgraded: true };
    }
    return { url, sourceType: 'etsy', isUpgraded: false };
  }

  // 3. Shopify Master Rule:
  // Strips Shopify dimension suffixes like _1024x1024, _2048x2048, _grande, _master
  if (url.includes('cdn.shopify.com') || url.includes('/products/')) {
    let upgraded = url;

    // Remove Shopify URL query sizing params
    try {
      const parsed = new URL(url, currentHref);
      if (parsed.searchParams.has('width')) parsed.searchParams.delete('width');
      if (parsed.searchParams.has('height')) parsed.searchParams.delete('height');
      if (parsed.searchParams.has('crop')) parsed.searchParams.delete('crop');
      upgraded = parsed.toString();
    } catch {
      // Continue with string replacements if URL parse fails
    }

    // Remove dimension suffix like _1024x1024 or _large
    const shopifySuffixRegex = /_(\d+x\d*|\d*x\d+|pico|icon|thumb|small|compact|medium|large|grande|1024x1024|2048x2048)(@\d+x)?(?=\.[a-zA-Z0-9]+)/i;
    if (shopifySuffixRegex.test(upgraded)) {
      upgraded = upgraded.replace(shopifySuffixRegex, '');
      return { url: upgraded, sourceType: 'shopify', isUpgraded: true };
    }

    return { url: upgraded, sourceType: 'shopify', isUpgraded: upgraded !== url };
  }

  // 4. Instagram Deep CDN Rule:
  // Handles Instagram CDN domain patterns and extracts maximum size
  if (url.includes('cdninstagram.com') || url.includes('fbcdn.net') || currentHost.includes('instagram.com')) {
    // If element has srcset, pick maximum resolution candidate
    if (element && element instanceof HTMLImageElement && element.srcset) {
      const best = getBestFromSrcset(element.srcset);
      if (best) {
        url = best;
      }
    }

    // Instagram / Meta CDN path dimension & crop cleaner
    let upgraded = url;

    // A. Upgrade Meta CDN stp parameters (e.g. stp=dst-jpg_e35_p640x640 -> p1080x1080)
    upgraded = upgraded.replace(/p(150|240|320|480|640|750)x\1/gi, 'p1080x1080');
    upgraded = upgraded.replace(/s(150|240|320|480|640|750)x\1/gi, 's1080x1080');

    // B. Strip square crop constraints to restore full original framing
    upgraded = upgraded.replace(/c\d+\.\d+\.\d+\.\d+[a-z]?_/gi, '');

    // C. Replace path dimension segments
    upgraded = upgraded.replace(/\/s(150|240|320|480|640|750)x\1\//gi, '/s1080x1080/');
    upgraded = upgraded.replace(/\/p(150|240|320|480|640|750)x\1\//gi, '/p1080x1080/');

    return {
      url: upgraded,
      sourceType: 'instagram',
      isUpgraded: upgraded !== rawUrl
    };
  }

  // 5. Scene7 / Adobe Dynamic Media (Tiffany, Cartier, Bulgari, Harry Winston, De Beers):
  if (url.includes('/is/image/') || url.includes('scene7.com')) {
    try {
      const parsed = new URL(url, currentHref);
      parsed.searchParams.delete('wid');
      parsed.searchParams.delete('hei');
      parsed.searchParams.delete('fit');
      parsed.searchParams.set('qlt', '100');
      parsed.searchParams.set('resMode', 'sharp2');
      return { url: parsed.toString(), sourceType: 'scene7', isUpgraded: true };
    } catch {
      // ignore
    }
  }

  // 6. Amazon Master Rule:
  // Replaces scaling blocks like ._AC_UL800_.jpg with .jpg
  if (url.includes('amazon.com') || url.includes('media-amazon.com')) {
    const amazonRegex = /\._[A-Z0-9,_\-]+_\.([a-zA-Z0-9]+)$/i;
    if (amazonRegex.test(url)) {
      const upgraded = url.replace(amazonRegex, '.$1');
      return { url: upgraded, sourceType: 'amazon', isUpgraded: true };
    }
  }

  // 7. WordPress / WooCommerce Master Rule:
  // Strips auto-generated dimensions like -768x512.jpg, -300x300.png
  const wpRegex = /-\d+x\d+\.(jpe?g|png|webp|avif)$/i;
  if (wpRegex.test(url)) {
    const upgraded = url.replace(wpRegex, '.$1');
    return { url: upgraded, sourceType: 'woocommerce', isUpgraded: true };
  }

  // 8. Cloudinary Master Rule:
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    const upgraded = url.replace(/\/upload\/(?:[a-zA-Z0-9_,]+)\//, '/upload/q_100/');
    if (upgraded !== url) {
      return { url: upgraded, sourceType: 'cloudinary', isUpgraded: true };
    }
  }

  // 9. Imgix & Generic CDN Sizing Query Params:
  if (url.includes('imgix.net') || url.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(url, currentHref);
      parsed.searchParams.delete('w');
      parsed.searchParams.delete('h');
      parsed.searchParams.delete('fit');
      parsed.searchParams.delete('crop');
      parsed.searchParams.set('q', '100');
      return { url: parsed.toString(), sourceType: 'imgix', isUpgraded: true };
    } catch {
      // ignore
    }
  }

  // Default standard image
  return { url, sourceType: 'standard', isUpgraded: false };
}

/**
 * Resolves relative URLs to fully qualified absolute HTTP/HTTPS URLs.
 */
export function resolveAbsoluteUrl(path: string): string {
  try {
    const base = typeof window !== 'undefined' && window.location ? window.location.href : 'http://localhost';
    return new URL(path, base).href;
  } catch {
    return path;
  }
}

/**
 * Determines clean file extension and user-friendly naming for jewelry pieces.
 */
export function getSafeFilename(url: string, index: number, altText?: string): string {
  let cleanName = '';

  if (altText && altText.trim().length > 2) {
    cleanName = altText
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '_')
      .slice(0, 40);
  }

  if (!cleanName) {
    try {
      const base = typeof window !== 'undefined' && window.location ? window.location.href : 'http://localhost';
      const pathname = new URL(url, base).pathname;
      const baseName = pathname.split('/').pop() || '';
      cleanName = baseName.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9_-]+/gi, '_').slice(0, 40);
    } catch {
      cleanName = 'jewelry_image';
    }
  }

  if (!cleanName || cleanName.length < 2) {
    cleanName = 'jewelry_image';
  }

  // Determine extension
  let ext = 'jpg';
  const match = url.match(/\.(jpe?g|png|webp|avif|gif)(\?.*)?$/i);
  if (match && match[1]) {
    ext = match[1].toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
  }

  const paddedIndex = String(index + 1).padStart(3, '0');
  return `${cleanName}_${paddedIndex}.${ext}`;
}
