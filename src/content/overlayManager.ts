import { DetectedImage } from '../types';
import { ICONS } from '../utils/icons';

export class OverlayManager {
  private shadowRoot: ShadowRoot;
  private overlaysContainer: HTMLDivElement;
  private badgesMap: Map<string, HTMLElement> = new Map();
  private onToggleSelect: (imageId: string, selected: boolean) => void;
  private onDownloadSingle: (image: DetectedImage) => void;

  constructor(
    shadowRoot: ShadowRoot,
    onToggleSelect: (imageId: string, selected: boolean) => void,
    onDownloadSingle: (image: DetectedImage) => void
  ) {
    this.shadowRoot = shadowRoot;
    this.onToggleSelect = onToggleSelect;
    this.onDownloadSingle = onDownloadSingle;

    this.overlaysContainer = document.createElement('div');
    this.overlaysContainer.className = 'diamond-overlays-container';
    this.shadowRoot.appendChild(this.overlaysContainer);

    window.addEventListener('scroll', () => this.updatePositions(), { passive: true });
    window.addEventListener('resize', () => this.updatePositions(), { passive: true });
  }

  public renderBadges(images: DetectedImage[], showBadges: boolean) {
    this.overlaysContainer.innerHTML = '';
    this.badgesMap.clear();

    if (!showBadges) return;

    for (const img of images) {
      try {
        if (!img.element) continue;

        const rect = img.element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        const badge = this.createBadgeElement(img);
        this.overlaysContainer.appendChild(badge);
        this.badgesMap.set(img.id, badge);

        this.positionBadge(badge, img.element);
        this.updateElementSelectionVisual(img);
      } catch (err) {
        // Safe fail per-item so one element cannot break the page
      }
    }
  }

  private createBadgeElement(img: DetectedImage): HTMLElement {
    const badge = document.createElement('div');
    badge.className = `diamond-badge ${img.selected ? 'is-selected' : ''}`;
    badge.dataset.imageId = img.id;

    const isVideo = img.mediaType === 'video';
    const isCarousel = Array.isArray(img.carouselItems) && img.carouselItems.length > 1;

    let sourceTag = 'MASTER 4K';
    let tagClass = 'master';

    if (isVideo) {
      if (img.sourceType === 'instagram') {
        sourceTag = 'REEL 1080P';
        tagClass = 'insta';
      } else {
        sourceTag = 'HD VIDEO';
        tagClass = 'master';
      }
    } else if (isCarousel) {
      sourceTag = `CAROUSEL (${img.carouselItems!.length})`;
      tagClass = 'insta';
    } else if (img.sourceType === 'etsy') {
      sourceTag = 'ETSY 4K';
      tagClass = 'etsy';
    } else if (img.sourceType === 'shopify') {
      sourceTag = 'SHOPIFY RAW';
      tagClass = 'shopify';
    } else if (img.sourceType === 'tanishq') {
      sourceTag = 'TANISHQ 4K';
      tagClass = 'tanishq';
    } else if (img.sourceType === 'instagram') {
      sourceTag = 'PHOTO 1080P';
      tagClass = 'insta';
    } else if (img.sourceType === 'scene7') {
      sourceTag = 'STUDIO MASTER';
      tagClass = 'master';
    }

    const resolutionDisplay =
      img.naturalWidth && img.naturalHeight
        ? `${img.naturalWidth}×${img.naturalHeight}`
        : `${img.width}×${img.height}`;

    if (isVideo) {
      // 1. Direct Video / Reel Action Badge
      const isInsta = img.sourceType === 'instagram';
      const mainBtnLabel = isInsta ? 'Download Reel' : 'Download Video';

      badge.innerHTML = `
        <div class="diamond-badge-inner">
          <label class="diamond-checkbox-label" title="Select item">
            <input type="checkbox" class="diamond-checkbox" ${img.selected ? 'checked' : ''} />
            <span class="diamond-checkmark"></span>
          </label>
          
          <div class="diamond-badge-info">
            <span class="diamond-tag ${tagClass}">${sourceTag}</span>
          </div>

          <div class="dm-direct-actions">
            <button class="dm-direct-action-btn dm-btn-primary btn-dl-video" title="Download Master 1080p Video">
              ${ICONS.download(13)}
              <span>${mainBtnLabel}</span>
            </button>

            ${
              img.videoPoster
                ? `
              <button class="dm-direct-action-btn dm-btn-secondary btn-dl-cover" title="Download High-Res Cover Thumbnail">
                ${ICONS.photo(13)}
                <span>Cover</span>
              </button>
            `
                : ''
            }

            <button class="dm-direct-action-btn dm-btn-icon btn-preview" title="View Full Video">
              ${ICONS.zoom(13)}
            </button>
          </div>
        </div>
      `;
    } else if (isCarousel) {
      // 2. Direct Carousel Action Badge (All Photos ZIP + Single)
      badge.innerHTML = `
        <div class="diamond-badge-inner">
          <label class="diamond-checkbox-label" title="Select item">
            <input type="checkbox" class="diamond-checkbox" ${img.selected ? 'checked' : ''} />
            <span class="diamond-checkmark"></span>
          </label>
          
          <div class="diamond-badge-info">
            <span class="diamond-tag ${tagClass}">${sourceTag}</span>
          </div>

          <div class="dm-direct-actions">
            <button class="dm-direct-action-btn dm-btn-primary btn-dl-carousel-all" title="Download All ${img.carouselItems!.length} Photos in Post as ZIP">
              ${ICONS.zip(13)}
              <span>Download All (${img.carouselItems!.length}) ZIP</span>
            </button>

            <button class="dm-direct-action-btn dm-btn-secondary btn-dl-photo" title="Download Current Photo">
              ${ICONS.download(13)}
              <span>Photo</span>
            </button>

            <button class="dm-direct-action-btn dm-btn-icon btn-preview" title="View Full Photo">
              ${ICONS.zoom(13)}
            </button>
          </div>
        </div>
      `;
    } else {
      // 3. Direct Photo Action Badge
      badge.innerHTML = `
        <div class="diamond-badge-inner">
          <label class="diamond-checkbox-label" title="Select photo">
            <input type="checkbox" class="diamond-checkbox" ${img.selected ? 'checked' : ''} />
            <span class="diamond-checkmark"></span>
          </label>
          
          <div class="diamond-badge-info">
            <span class="diamond-tag ${tagClass}">${sourceTag}</span>
            <span class="diamond-res">${resolutionDisplay}</span>
          </div>

          <div class="dm-direct-actions">
            <button class="dm-direct-action-btn dm-btn-primary btn-dl-photo" title="Download Master Photo">
              ${ICONS.download(13)}
              <span>Download Photo</span>
            </button>

            <button class="dm-direct-action-btn dm-btn-icon btn-preview" title="View Full Master">
              ${ICONS.zoom(13)}
            </button>
          </div>
        </div>
      `;
    }

    // Checkbox Event
    const checkbox = badge.querySelector<HTMLInputElement>('.diamond-checkbox');
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        img.selected = checkbox.checked;
        badge.classList.toggle('is-selected', img.selected);
        this.updateElementSelectionVisual(img);
        this.onToggleSelect(img.id, img.selected);
      });
    }

    // Preview Event
    const previewBtn = badge.querySelector<HTMLButtonElement>('.btn-preview');
    previewBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(img.masterSrc, '_blank');
    });

    // Direct Video / Reel Download Event
    const dlVideoBtn = badge.querySelector<HTMLButtonElement>('.btn-dl-video');
    dlVideoBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isInsta = img.sourceType === 'instagram';
      const mainBtnLabel = isInsta ? 'Download Reel' : 'Download Video';
      dlVideoBtn.innerHTML = `${ICONS.spinner(13)}<span>Downloading...</span>`;
      this.onDownloadSingle(img);
      setTimeout(() => {
        dlVideoBtn.innerHTML = `${ICONS.check(13)}<span>Saved!</span>`;
        setTimeout(() => {
          dlVideoBtn.innerHTML = `${ICONS.download(13)}<span>${mainBtnLabel}</span>`;
        }, 1800);
      }, 500);
    });

    // Direct Cover / Thumbnail Download Event
    const dlCoverBtn = badge.querySelector<HTMLButtonElement>('.btn-dl-cover');
    dlCoverBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!img.videoPoster) return;
      dlCoverBtn.innerHTML = `${ICONS.spinner(13)}<span>Saving...</span>`;
      const coverItem: DetectedImage = {
        ...img,
        masterSrc: img.videoPoster,
        filename: img.filename.replace(/\.(mp4|webm)$/i, '_cover.jpg'),
        mediaType: 'image'
      };
      this.onDownloadSingle(coverItem);
      setTimeout(() => {
        dlCoverBtn.innerHTML = `${ICONS.check(13)}<span>Saved!</span>`;
        setTimeout(() => {
          dlCoverBtn.innerHTML = `${ICONS.photo(13)}<span>Cover</span>`;
        }, 1800);
      }, 500);
    });

    // Direct Carousel All ZIP Download Event
    const dlCarouselAllBtn = badge.querySelector<HTMLButtonElement>('.btn-dl-carousel-all');
    dlCarouselAllBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!img.carouselItems) return;
      dlCarouselAllBtn.innerHTML = `${ICONS.spinner(13)}<span>Creating ZIP...</span>`;
      chrome.runtime.sendMessage({
        type: 'DOWNLOAD_BATCH',
        images: img.carouselItems.map((item) => ({
          url: item.url,
          filename: item.filename
        })),
        asZip: true,
        zipFilename: `instagram_carousel_${img.id}.zip`
      });
      setTimeout(() => {
        dlCarouselAllBtn.innerHTML = `${ICONS.check(13)}<span>ZIP Started!</span>`;
        setTimeout(() => {
          dlCarouselAllBtn.innerHTML = `${ICONS.zip(13)}<span>Download All (${img.carouselItems!.length}) ZIP</span>`;
        }, 2000);
      }, 800);
    });

    // Direct Photo Download Event
    const dlPhotoBtn = badge.querySelector<HTMLButtonElement>('.btn-dl-photo');
    dlPhotoBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      dlPhotoBtn.innerHTML = `${ICONS.spinner(13)}<span>Downloading...</span>`;
      this.onDownloadSingle(img);
      setTimeout(() => {
        dlPhotoBtn.innerHTML = `${ICONS.check(13)}<span>Saved!</span>`;
        setTimeout(() => {
          dlPhotoBtn.innerHTML = `${ICONS.download(13)}<span>Download Photo</span>`;
        }, 1800);
      }, 500);
    });

    badge.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) {
        return;
      }
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        img.selected = checkbox.checked;
        badge.classList.toggle('is-selected', img.selected);
        this.updateElementSelectionVisual(img);
        this.onToggleSelect(img.id, img.selected);
      }
    });

    return badge;
  }

  private isElementFixed(el: HTMLElement): boolean {
    try {
      let curr: Element | null = el;
      while (curr && curr !== document.body && curr !== document.documentElement) {
        if (curr.nodeType === Node.ELEMENT_NODE) {
          const style = window.getComputedStyle(curr);
          if (style && (style.position === 'fixed' || style.position === 'sticky')) {
            return true;
          }
          if (curr.getAttribute && curr.getAttribute('role') === 'dialog') {
            return true;
          }
        }
        curr = curr.parentElement;
      }
    } catch {
      return false;
    }
    return false;
  }

  private positionBadge(badge: HTMLElement, targetEl: HTMLElement) {
    try {
      (badge as any).__targetEl = targetEl;
      const isFixed = this.isElementFixed(targetEl);
      const rect = targetEl.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset || 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      // Pin cleanly to top-right corner of the media item
      if (isFixed) {
        badge.style.position = 'fixed';
        badge.style.top = `${Math.max(12, rect.top + 14)}px`;
        badge.style.right = `${Math.max(14, window.innerWidth - rect.right + 14)}px`;
        badge.style.left = 'auto';
      } else {
        badge.style.position = 'absolute';
        badge.style.top = `${Math.max(0, scrollY + rect.top + 14)}px`;
        badge.style.right = `${Math.max(14, document.documentElement.clientWidth - (scrollX + rect.right) + 14)}px`;
        badge.style.left = 'auto';
      }
    } catch {
      // Ignore positioning error
    }
  }

  public updatePositions() {
    for (const [id, badge] of this.badgesMap.entries()) {
      const imgEl = (badge as any).__targetEl;
      if (imgEl && imgEl.isConnected) {
        this.positionBadge(badge, imgEl);
      }
    }
  }

  public updateSelectionState(images: DetectedImage[]) {
    for (const img of images) {
      const badge = this.badgesMap.get(img.id);
      if (badge) {
        badge.classList.toggle('is-selected', img.selected);
        const checkbox = badge.querySelector<HTMLInputElement>('.diamond-checkbox');
        if (checkbox) checkbox.checked = img.selected;
      }
      this.updateElementSelectionVisual(img);
    }
  }

  private updateElementSelectionVisual(img: DetectedImage) {
    if (!img.element) return;
    if (img.selected) {
      img.element.style.outline = '2px solid rgba(255, 255, 255, 0.95)';
      img.element.style.outlineOffset = '2px';
      img.element.style.boxShadow = '0 0 16px rgba(255, 255, 255, 0.4)';
      img.element.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      img.element.style.outline = '';
      img.element.style.outlineOffset = '';
      img.element.style.boxShadow = '';
    }
  }
}
