import { ImageSourceType } from '../types';

export interface UpgradedMediaResult {
  url: string;
  sourceType: ImageSourceType;
  isUpgraded: boolean;
  qualityTier: '4K Master' | 'Ultra HD' | '1080p Master' | 'High Res' | 'Standard';
  estimatedResolution?: string;
}

/**
 * Dedicated Quality Engine
 * Systematic, rule-based master clarity engine for luxury jewelry, e-commerce & social media.
 * Recovers raw uncompressed studio uploads from CDNs before responsive downsampling.
 */
export class QualityEngine {
  private static readonly ZOOM_ATTRIBUTES = [
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
    'data-orig-file',
    'data-super-large',
    'data-desktop-src',
    'data-splide-lazy',
    'data-lazy-src',
    'data-src'
  ];

  /**
   * Upgrades any raw image or video URL to its highest-resolution master source.
   */
  public static upgrade(rawUrl: string, element?: HTMLElement): UpgradedMediaResult {
    if (!rawUrl || typeof rawUrl !== 'string') {
      return { url: '', sourceType: 'standard', isUpgraded: false, qualityTier: 'Standard' };
    }

    let url = rawUrl.trim();
    const currentHost = typeof window !== 'undefined' && window.location ? window.location.hostname : '';
    const currentHref = typeof window !== 'undefined' && window.location ? window.location.href : 'http://localhost';

    // 1. Inspect Zoom Lightbox & High-Res DOM Attributes
    if (element) {
      const zoomResult = this.inspectElementZoomAttributes(element);
      if (zoomResult) {
        url = zoomResult;
      }
    }

    // 2. Etsy Master Rule:
    // Transforms all thumbnail sizes (il_75x75, il_170x135, il_340x270, il_794xN, il_1588xN)
    // into the seller's original uncompressed master upload (il_fullxfull)
    if (url.includes('etsystatic.com') || currentHost.includes('etsy.com')) {
      const etsyRegex = /\/il_\d+x[0-9N]+\./i;
      if (etsyRegex.test(url)) {
        const upgraded = url.replace(etsyRegex, '/il_fullxfull.');
        return { url: upgraded, sourceType: 'etsy', isUpgraded: true, qualityTier: '4K Master' };
      }
      return { url, sourceType: 'etsy', isUpgraded: false, qualityTier: 'Ultra HD' };
    }

    // 3. Shopify Master Rule:
    // Accurately recognizes cdn.shopify.com, modern custom domain paths (/cdn/shop/files/, /cdn/shop/products/),
    // and stores running Shopify. Strips all downscaling parameters (&width=, &height=, &crop=, &format=webp)
    // and dimension suffixes (_800x, _1024x1024, _grande) to retrieve the raw uncompressed 4K studio upload.
    const isShopify =
      url.includes('cdn.shopify.com') ||
      url.includes('/cdn/shop/') ||
      url.includes('/s/files/') ||
      url.includes('myshopify.com') ||
      url.includes('/products/') ||
      (typeof window !== 'undefined' &&
        (Boolean((window as any).Shopify) ||
          Boolean(document.querySelector('link[href*="cdn.shopify.com"]')) ||
          Boolean(document.querySelector('script[src*="cdn.shopify.com"]')) ||
          Boolean(document.querySelector('meta[name="shopify-digital-wallet-support"]'))));

    if (isShopify) {
      let upgraded = url;

      try {
        const parsed = new URL(url, currentHref);
        parsed.searchParams.delete('width');
        parsed.searchParams.delete('height');
        parsed.searchParams.delete('crop');
        parsed.searchParams.delete('format'); // Strip lossy webp/pjpg re-compression
        parsed.searchParams.delete('pad');
        parsed.searchParams.delete('scale');
        upgraded = parsed.toString();
      } catch {
        // fallback
      }

      const shopifySuffixRegex =
        /_(\d+x\d*|\d*x\d+|pico|icon|thumb|small|compact|medium|large|grande|1024x1024|2048x2048|master)(@\d+x)?(?=\.[a-zA-Z0-9]+)/i;
      if (shopifySuffixRegex.test(upgraded)) {
        upgraded = upgraded.replace(shopifySuffixRegex, '');
      }

      return {
        url: upgraded,
        sourceType: 'shopify',
        isUpgraded: upgraded !== rawUrl,
        qualityTier: '4K Master'
      };
    }

    // 4. Tanishq / Titan / Mia / Fastrack / Zoya Luxury Jewelry Rule:
    // Akamai Image Manager on Titan servers (?impolicy=...&imwidth=...)
    // and Salesforce Commerce Cloud (/on/demandware.static/... or /dw/image/...)
    if (
      url.includes('titan.co.in') ||
      url.includes('tanishq.co.in') ||
      url.includes('demandware.static') ||
      url.includes('/dw/image/') ||
      url.includes('staticimg.tanishq.co.in')
    ) {
      try {
        let upgraded = url;

        // Strategy A: Bypass Demandware Cartridge service to route directly to uncompressed master file
        if (upgraded.includes('/dw/image/') && upgraded.includes('/on/demandware.static/')) {
          upgraded = upgraded.replace(/\/dw\/image\/v\d+\/[^/]+\//i, '/');
          const parsed = new URL(upgraded, currentHref);
          parsed.search = ''; // Strip all downscale/compression params
          return {
            url: parsed.toString(),
            sourceType: 'tanishq',
            isUpgraded: true,
            qualityTier: '4K Master'
          };
        }

        const parsed = new URL(url, currentHref);

        // Akamai Image Manager on Tanishq / Titan
        if (parsed.searchParams.has('imwidth') || parsed.searchParams.has('impolicy')) {
          parsed.searchParams.set('imwidth', '2400');
          parsed.searchParams.set('impolicy', 'hq');
        }

        // Salesforce Commerce Cloud Demandware
        if (parsed.searchParams.has('sw') || parsed.searchParams.has('sh')) {
          parsed.searchParams.set('sw', '2400');
          parsed.searchParams.set('sh', '2400');
          parsed.searchParams.delete('fit');
        }

        const finalUrl = parsed.toString();
        return {
          url: finalUrl,
          sourceType: 'tanishq',
          isUpgraded: finalUrl !== rawUrl,
          qualityTier: '4K Master'
        };
      } catch {
        // fallback
      }
    }

    // 5. CaratLane / Blue Nile / Luxury Diamond CDNs
    if (url.includes('caratlane.com') || url.includes('bluenile.com') || url.includes('brilliantearth.com')) {
      try {
        const parsed = new URL(url, currentHref);
        parsed.searchParams.delete('w');
        parsed.searchParams.delete('width');
        parsed.searchParams.delete('h');
        parsed.searchParams.delete('height');
        parsed.searchParams.delete('fit');
        parsed.searchParams.delete('crop');
        parsed.searchParams.delete('auto');

        const upgraded = parsed.toString();
        return {
          url: upgraded,
          sourceType: 'zoom',
          isUpgraded: upgraded !== rawUrl,
          qualityTier: '4K Master'
        };
      } catch {
        // fallback
      }
    }

    // 6. Instagram Deep CDN Rule:
    // Bypasses 640px/750px viewport downsampling, strips square crop masks, forces 1080w CDN master
    if (url.includes('cdninstagram.com') || url.includes('fbcdn.net') || currentHost.includes('instagram.com')) {
      if (element && element instanceof HTMLImageElement && element.srcset) {
        const best = this.getBestFromSrcset(element.srcset);
        if (best) url = best;
      }

      let upgraded = url;
      // Upgrade Meta CDN stp parameters (e.g. stp=dst-jpg_e35_p640x640 -> p1080x1080)
      upgraded = upgraded.replace(/p(150|240|320|480|640|750)x\1/gi, 'p1080x1080');
      upgraded = upgraded.replace(/s(150|240|320|480|640|750)x\1/gi, 's1080x1080');

      // Strip square crop constraints to restore uncropped framing
      upgraded = upgraded.replace(/c\d+\.\d+\.\d+\.\d+[a-z]?_/gi, '');

      // Replace path dimension segments
      upgraded = upgraded.replace(/\/s(150|240|320|480|640|750)x\1\//gi, '/s1080x1080/');
      upgraded = upgraded.replace(/\/p(150|240|320|480|640|750)x\1\//gi, '/p1080x1080/');

      return {
        url: upgraded,
        sourceType: 'instagram',
        isUpgraded: upgraded !== rawUrl,
        qualityTier: '1080p Master'
      };
    }

    // 7. Adobe Scene7 / Dynamic Media (Tiffany, Cartier, Bulgari, Harry Winston, De Beers):
    if (url.includes('/is/image/') || url.includes('scene7.com')) {
      try {
        const parsed = new URL(url, currentHref);
        parsed.searchParams.delete('wid');
        parsed.searchParams.delete('hei');
        parsed.searchParams.delete('fit');
        parsed.searchParams.set('qlt', '100');
        parsed.searchParams.set('resMode', 'sharp2');
        return {
          url: parsed.toString(),
          sourceType: 'scene7',
          isUpgraded: true,
          qualityTier: '4K Master'
        };
      } catch {
        // ignore
      }
    }

    // 8. IIIF High-Resolution Protocol (Auction Houses & Luxury Diamond Galleries):
    // Replaces /full/800,/0/default.jpg with /full/max/0/default.jpg
    const iiifRegex = /\/(full|\d+,\d*|,\d+)\/(\d+|\^?\d+,\d*|pct:\d+)\/(\d+)\/(default\.[a-z]+)$/i;
    if (iiifRegex.test(url)) {
      const upgraded = url.replace(iiifRegex, '/full/max/0/$4');
      return { url: upgraded, sourceType: 'zoom', isUpgraded: true, qualityTier: '4K Master' };
    }

    // 9. Amazon Raw Catalog Rule:
    if (url.includes('amazon.com') || url.includes('media-amazon.com')) {
      const amazonRegex = /\._[A-Z0-9,_\-]+_\.([a-zA-Z0-9]+)$/i;
      if (amazonRegex.test(url)) {
        const upgraded = url.replace(amazonRegex, '.$1');
        return { url: upgraded, sourceType: 'amazon', isUpgraded: true, qualityTier: 'Ultra HD' };
      }
    }

    // 10. WooCommerce / WordPress Master Media Rule:
    // Strips auto-generated thumbnail suffixes like -768x512.jpg to reveal the master upload
    const wpRegex = /-\d+x\d+\.(jpe?g|png|webp|avif)$/i;
    if (wpRegex.test(url)) {
      const upgraded = url.replace(wpRegex, '.$1');
      return { url: upgraded, sourceType: 'woocommerce', isUpgraded: true, qualityTier: 'Ultra HD' };
    }

    // 11. Cloudinary Master Rule:
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
      const upgraded = url.replace(/\/upload\/(?:[a-zA-Z0-9_,]+)\//, '/upload/q_100/');
      if (upgraded !== url) {
        return { url: upgraded, sourceType: 'cloudinary', isUpgraded: true, qualityTier: 'Ultra HD' };
      }
    }

    // 12. Imgix & Generic CDN Sizing Query Params:
    if (url.includes('imgix.net') || url.includes('images.unsplash.com')) {
      try {
        const parsed = new URL(url, currentHref);
        parsed.searchParams.delete('w');
        parsed.searchParams.delete('h');
        parsed.searchParams.delete('fit');
        parsed.searchParams.delete('crop');
        parsed.searchParams.set('q', '100');
        return { url: parsed.toString(), sourceType: 'imgix', isUpgraded: true, qualityTier: 'Ultra HD' };
      } catch {
        // ignore
      }
    }

    return { url, sourceType: 'standard', isUpgraded: false, qualityTier: 'High Res' };
  }

  /**
   * Inspects element and surrounding DOM for zoom & lightbox triggers.
   */
  private static inspectElementZoomAttributes(element: HTMLElement): string | null {
    // A. Check dataset attributes on the element itself
    for (const attr of this.ZOOM_ATTRIBUTES) {
      const val = element.getAttribute(attr);
      if (val && val.trim().length > 5 && !val.startsWith('data:')) {
        return this.resolveAbsoluteUrl(val.trim());
      }
    }

    // B. Check parent anchor tag (common lightbox pattern: <a href="highres.jpg"><img src="thumb.jpg"></a>)
    const anchor = element.closest('a');
    if (anchor && anchor.href) {
      const href = anchor.href.trim();
      if (/\.(jpe?g|png|webp|avif|mp4|webm)(\?.*)?$/i.test(href)) {
        return href;
      }
      for (const attr of this.ZOOM_ATTRIBUTES) {
        const val = anchor.getAttribute(attr);
        if (val && val.trim().length > 5 && !val.startsWith('data:')) {
          return this.resolveAbsoluteUrl(val.trim());
        }
      }
    }

    return null;
  }

  public static getBestFromSrcset(srcset: string): string | null {
    if (!srcset || typeof srcset !== 'string') return null;

    const entries = srcset
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);

    let bestUrl: string | null = null;
    let maxWeight = 0;

    for (const entry of entries) {
      const parts = entry.split(/\s+/);
      const candidateUrl = parts[0];
      const descriptor = parts[1] || '';

      let weight = 1;
      if (descriptor.endsWith('w')) {
        weight = parseInt(descriptor.slice(0, -1), 10) || 1;
      } else if (descriptor.endsWith('x')) {
        weight = parseFloat(descriptor.slice(0, -1)) * 1000 || 1;
      }

      if (weight > maxWeight) {
        maxWeight = weight;
        bestUrl = candidateUrl;
      }
    }

    return bestUrl;
  }

  public static resolveAbsoluteUrl(path: string): string {
    try {
      const base = typeof window !== 'undefined' && window.location ? window.location.href : 'http://localhost';
      return new URL(path, base).href;
    } catch {
      return path;
    }
  }

  /**
   * Generates a safe, professional filename preserving studio clarity conventions.
   */
  public static getSafeFilename(url: string, index: number, altText?: string): string {
    let cleanName = '';

    if (altText && altText.trim().length > 2) {
      cleanName = altText
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '')
        .slice(0, 45);
    }

    if (!cleanName) {
      try {
        const base = typeof window !== 'undefined' && window.location ? window.location.href : 'http://localhost';
        const pathname = new URL(url, base).pathname;
        const baseName = pathname.split('/').pop() || '';
        cleanName = baseName.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9_-]+/gi, '_').slice(0, 40);
      } catch {
        cleanName = 'jewelry_piece';
      }
    }

    if (!cleanName || cleanName.length < 2) {
      cleanName = 'jewelry_piece';
    }

    let ext = 'jpg';
    const match = url.match(/\.(jpe?g|png|webp|avif|mp4|webm|gif)(\?.*)?$/i);
    if (match && match[1]) {
      ext = match[1].toLowerCase();
      if (ext === 'jpeg') ext = 'jpg';
    }

    const paddedIndex = String(index + 1).padStart(3, '0');
    return `${cleanName}_${paddedIndex}.${ext}`;
  }
}
