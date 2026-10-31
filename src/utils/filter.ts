/**
 * Smart Noise, Logo, and Boilerplate Filter.
 * Identifies and eliminates non-product clutter like website logos, payment badges,
 * tracking pixels, UI arrows, social media icons, and ratings stars, while strictly
 * preserving high-value jewelry pieces, diamond rings, bangles, and hero banners.
 */

const JUNK_KEYWORDS = [
  'logo',
  'favicon',
  'avatar',
  'profile',
  'payment',
  'visa',
  'mastercard',
  'maestro',
  'paypal',
  'amex',
  'american-express',
  'applepay',
  'apple-pay',
  'googlepay',
  'google-pay',
  'klarna',
  'afterpay',
  'sezzle',
  'trustpilot',
  'secure-checkout',
  'ssl',
  'star-',
  'review-star',
  'icon-',
  '-icon',
  'arrow-',
  '-arrow',
  'chevron',
  'caret',
  'search-',
  'cart-',
  'bag-',
  'basket',
  'close-',
  'menu-',
  'hamburger',
  'divider',
  'spacer',
  'spinner',
  'loader',
  'blank.gif',
  'pixel.gif',
  '1x1',
  'tracking',
  'analytics',
  'social-',
  'facebook',
  'twitter',
  'pinterest-pin',
  'youtube',
  'tiktok',
  'whatsapp-icon'
];

export interface FilterOptions {
  minWidth: number;
  minHeight: number;
  ignoreLogos: boolean;
  ignoreSvg: boolean;
}

export const DEFAULT_FILTER_OPTIONS: FilterOptions = {
  minWidth: 80,
  minHeight: 80,
  ignoreLogos: true,
  ignoreSvg: true
};

/**
 * Checks whether an element or image candidate is considered unwanted website noise/logo.
 */
export function isEligibleJewelryImage(
  el: HTMLElement,
  src: string,
  options: FilterOptions = DEFAULT_FILTER_OPTIONS
): boolean {
  if (!src) return false;

  try {
    const lowerSrc = src.toLowerCase();

    // 1. Strict Instagram Noise & Avatar Filter Engine
    const isInstagram =
      typeof window !== 'undefined' &&
      window.location &&
      window.location.hostname.includes('instagram.com');

    if (isInstagram) {
      // A. Reject all Instagram avatar & profile picture CDN paths
      if (
        lowerSrc.includes('/t51.2885-19/') ||
        lowerSrc.includes('s150x150') ||
        lowerSrc.includes('p150x150') ||
        lowerSrc.includes('150_n.jpg') ||
        lowerSrc.includes('150_n.png') ||
        lowerSrc.includes('44_n.jpg') ||
        lowerSrc.includes('44_n.png') ||
        lowerSrc.includes('_a6hd')
      ) {
        return false;
      }

      // B. Reject profile picture alt text
      const alt = (el.getAttribute('alt') || '').toLowerCase();
      if (
        alt.includes('profile picture') ||
        alt.includes('profile photo') ||
        alt.includes('avatar')
      ) {
        return false;
      }

      // C. Reject comments, header bars, user info rows, reaction pickers
      if (
        el.closest('header') ||
        el.closest('ul._a9ym') ||
        el.closest('div._a9zs') ||
        el.closest('div[role="listitem"]') ||
        el.closest('form')
      ) {
        return false;
      }

      // D. Real feed photos & reels are always >= 200px wide; avatars are 32px-56px
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.width < 180) return false;
      if (rect.height > 0 && rect.height < 180) return false;
    }

    // 2. Filter out SVG icons or data-uri placeholders
    if (
      options.ignoreSvg &&
      (lowerSrc.endsWith('.svg') ||
        lowerSrc.includes('.svg?') ||
        lowerSrc.startsWith('data:image/svg'))
    ) {
      return false;
    }

    // 3. Ignore tiny base64 1x1 tracking pixels
    if (lowerSrc.startsWith('data:') && lowerSrc.length < 2000) {
      return false;
    }

    // 4. Dimension & Display Checks
    let renderedW = el.offsetWidth || 0;
    let renderedH = el.offsetHeight || 0;

    if (renderedW === 0 || renderedH === 0) {
      const rect = el.getBoundingClientRect();
      renderedW = rect.width || 0;
      renderedH = rect.height || 0;
    }

    let naturalW = 0;
    let naturalH = 0;
    if (el instanceof HTMLImageElement) {
      naturalW = el.naturalWidth || 0;
      naturalH = el.naturalHeight || 0;
    }

    const effectiveW = Math.max(renderedW, naturalW);
    const effectiveH = Math.max(renderedH, naturalH);

    // If size is confirmed and too tiny, drop it (icons / badges)
    if (effectiveW > 0 && effectiveH > 0) {
      if (effectiveW < options.minWidth && effectiveH < options.minHeight) {
        return false;
      }

      // Extreme aspect ratios (e.g. 1500x4 hairline divider or 2x800 scroll line)
      const ratio = effectiveW / effectiveH;
      if (ratio > 8 || ratio < 0.12) {
        return false;
      }
    }

    // 5. Strict Noise & Logo Elimination (Preserves all jewelry, banners & product cards)
    if (options.ignoreLogos) {
      let path = lowerSrc;
      try {
        path = new URL(lowerSrc, window.location.href).pathname;
      } catch {
        // ignore
      }

      // Direct logo file check
      if (
        path.includes('/logo.') ||
        path.includes('/logo_') ||
        path.includes('/logos/') ||
        path.includes('favicon') ||
        path.includes('/brand-logo')
      ) {
        return false;
      }

      // Payment & tracking icons
      if (
        path.includes('/payment') ||
        path.includes('/visa.') ||
        path.includes('/mastercard.') ||
        path.includes('/paypal.') ||
        path.includes('/apple-pay') ||
        path.includes('blank.gif') ||
        path.includes('pixel.gif') ||
        path.includes('/1x1.')
      ) {
        return false;
      }

      // If the image has reasonable display area, it is a real product/banner, NOT a logo
      const isMediaCandidate =
        (effectiveW >= 100 && effectiveH >= 100) ||
        (effectiveW * effectiveH >= 14000) ||
        (effectiveW === 0 && effectiveH === 0); // Not rendered yet / lazy-loading

      if (!isMediaCandidate) {
        const alt = (el.getAttribute('alt') || '').toLowerCase();
        for (const kw of JUNK_KEYWORDS) {
          if (path.includes(kw) || alt.includes(kw)) {
            if (
              kw.includes('star') &&
              (alt.includes('star sapphire') ||
                alt.includes('star ruby') ||
                alt.includes('star diamond'))
            ) {
              continue;
            }
            return false;
          }
        }
      }
    }

    return true;
  } catch {
    return true;
  }
}
