import { DetectedImage, ExtensionSettings } from '../types';
import { ICONS } from '../utils/icons';

export class SidePanel {
  private shadowRoot: ShadowRoot;
  private containerEl: HTMLDivElement;
  private triggerEl: HTMLDivElement;
  private backdropEl: HTMLDivElement;
  private drawerEl: HTMLDivElement;
  private toastEl: HTMLDivElement;
  private lightboxEl: HTMLDivElement;

  private isOpen: boolean = false;
  private activeFilter: string = 'all'; // 'all' | '4k' | 'hd' | 'video' | 'etsy' | 'instagram' | 'shopify'
  private searchQuery: string = '';

  private onDownloadSingle: (image: DetectedImage) => void;
  private onDownloadAllZip: () => void;
  private onDownloadSelected: () => void;
  private onSelectAll: () => void;
  private onDeselectAll: () => void;
  private onToggleImageSelect: (imageId: string, selected: boolean) => void;
  private onToggleEnabled: () => void;

  private cachedImages: DetectedImage[] = [];
  private cachedSettings: ExtensionSettings | null = null;

  constructor(
    shadowRoot: ShadowRoot,
    handlers: {
      onDownloadSingle: (image: DetectedImage) => void;
      onDownloadAllZip: () => void;
      onDownloadSelected: () => void;
      onSelectAll: () => void;
      onDeselectAll: () => void;
      onToggleImageSelect: (imageId: string, selected: boolean) => void;
      onToggleEnabled: () => void;
    }
  ) {
    this.shadowRoot = shadowRoot;
    this.onDownloadSingle = handlers.onDownloadSingle;
    this.onDownloadAllZip = handlers.onDownloadAllZip;
    this.onDownloadSelected = handlers.onDownloadSelected;
    this.onSelectAll = handlers.onSelectAll;
    this.onDeselectAll = handlers.onDeselectAll;
    this.onToggleImageSelect = handlers.onToggleImageSelect;
    this.onToggleEnabled = handlers.onToggleEnabled;

    this.containerEl = document.createElement('div');
    this.containerEl.className = 'diamond-side-root';

    // 1. Apple Floating Glass Trigger Tab
    this.triggerEl = document.createElement('div');
    this.triggerEl.className = 'diamond-side-trigger';
    this.triggerEl.innerHTML = `
      <div class="trigger-icon">${ICONS.diamond(18)}</div>
      <div class="trigger-text">
        <span class="trigger-title">Media</span>
        <span class="trigger-count">0 items</span>
      </div>
    `;
    this.triggerEl.addEventListener('click', () => this.toggleOpen());

    // 2. Frosted Backdrop (Clicks outside drawer close panel)
    this.backdropEl = document.createElement('div');
    this.backdropEl.className = 'diamond-side-backdrop';
    this.backdropEl.addEventListener('click', (e) => {
      if (e.target === this.backdropEl) {
        this.close();
      }
    });

    // 3. Apple Frosted Glass Side Drawer Panel (Clicks inside NEVER bubble to backdrop)
    this.drawerEl = document.createElement('div');
    this.drawerEl.className = 'diamond-side-panel';
    this.drawerEl.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // 4. Frosted Toast Notification
    this.toastEl = document.createElement('div');
    this.toastEl.className = 'diamond-toast';
    this.toastEl.innerHTML = `<span class="toast-icon">${ICONS.check(14)}</span><span class="toast-text"></span>`;

    // 5. Fullscreen Lightbox Modal
    this.lightboxEl = document.createElement('div');
    this.lightboxEl.className = 'diamond-lightbox';
    this.lightboxEl.innerHTML = `
      <button class="lightbox-close-btn" title="Close preview">${ICONS.close(18)}</button>
      <div class="lightbox-image-wrap">
        <div class="lightbox-media-container"></div>
        <div class="lightbox-details">
          <span class="lightbox-res"></span>
          <span class="lightbox-src"></span>
          <button class="btn-monochrome-secondary btn-lightbox-download">
            ${ICONS.download(14)} Download Master
          </button>
        </div>
      </div>
    `;
    const lbClose = this.lightboxEl.querySelector('.lightbox-close-btn');
    lbClose?.addEventListener('click', () => this.closeLightbox());
    this.lightboxEl.addEventListener('click', (e) => {
      if (e.target === this.lightboxEl) this.closeLightbox();
    });

    this.containerEl.appendChild(this.triggerEl);
    this.containerEl.appendChild(this.backdropEl);
    this.containerEl.appendChild(this.drawerEl);
    this.containerEl.appendChild(this.toastEl);
    this.containerEl.appendChild(this.lightboxEl);
    this.shadowRoot.appendChild(this.containerEl);

    // Global keyboard shortcut: Alt + D to toggle side panel
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'd' || e.key === 'D')) {
        this.toggleOpen();
      } else if (e.key === 'Escape') {
        if (this.lightboxEl.classList.contains('open')) {
          this.closeLightbox();
        } else if (this.isOpen) {
          this.close();
        }
      }
    });
  }

  public update(images: DetectedImage[], settings: ExtensionSettings) {
    this.cachedImages = images;
    this.cachedSettings = settings;

    // If extension is toggled OFF, hide trigger tab & close drawer
    if (!settings.enabled) {
      this.triggerEl.style.display = 'none';
      if (this.isOpen) this.close();
      return;
    } else {
      this.triggerEl.style.display = 'flex';
    }

    const totalCount = images.length;
    const selectedCount = images.filter((img) => img.selected).length;

    // Update trigger pill text
    const countEl = this.triggerEl.querySelector('.trigger-count');
    if (countEl) {
      countEl.textContent = selectedCount > 0 ? `${selectedCount}/${totalCount} selected` : `${totalCount} items`;
    }

    // Only do full drawer DOM rendering when drawer is actually OPEN
    if (!this.isOpen) {
      return;
    }

    this.refreshDrawerContent();
  }

  private refreshDrawerContent() {
    if (!this.cachedImages || !this.cachedSettings) return;

    const totalCount = this.cachedImages.length;
    const selectedCount = this.cachedImages.filter((img) => img.selected).length;

    // Filter images according to active filter and search query
    const visibleImages = this.cachedImages.filter((img) => {
      if (this.activeFilter === 'video') {
        if (img.mediaType !== 'video') return false;
      } else if (this.activeFilter === '4k') {
        const dim = Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height);
        if (dim < 1800) return false;
      } else if (this.activeFilter === 'hd') {
        const dim = Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height);
        if (dim < 1000) return false;
      } else if (this.activeFilter === 'etsy' && img.sourceType !== 'etsy') {
        return false;
      } else if (this.activeFilter === 'instagram' && img.sourceType !== 'instagram') {
        return false;
      } else if (this.activeFilter === 'shopify' && img.sourceType !== 'shopify') {
        return false;
      } else if (this.activeFilter === 'tanishq' && img.sourceType !== 'tanishq') {
        return false;
      }

      if (this.searchQuery.trim().length > 0) {
        const q = this.searchQuery.toLowerCase();
        const matchesAlt = img.altText.toLowerCase().includes(q);
        const matchesFilename = img.filename.toLowerCase().includes(q);
        const matchesSource = img.sourceType.toLowerCase().includes(q);
        if (!matchesAlt && !matchesFilename && !matchesSource) return false;
      }

      return true;
    });

    // Save previous scroll position
    const prevScrollTop = this.drawerEl.querySelector('.panel-grid-container')?.scrollTop || 0;

    this.renderDrawer(visibleImages, totalCount, selectedCount, this.cachedSettings);

    // Restore scroll position
    const gridContainer = this.drawerEl.querySelector('.panel-grid-container');
    if (gridContainer && prevScrollTop > 0) {
      gridContainer.scrollTop = prevScrollTop;
    }
  }

  private renderDrawer(
    visibleImages: DetectedImage[],
    totalCount: number,
    selectedCount: number,
    settings: ExtensionSettings
  ) {
    const videoCount = this.cachedImages.filter((img) => img.mediaType === 'video').length;

    this.drawerEl.innerHTML = `
      <!-- Apple Glass Header -->
      <header class="panel-header">
        <div class="header-left">
          <div class="header-logo-gem">${ICONS.diamond(18)}</div>
          <div class="header-title-block">
            <span class="header-title">Diamond Master</span>
            <span class="header-meta">${totalCount} Master Assets Found</span>
          </div>
        </div>
        <div class="header-right">
          <button class="panel-power-btn ${settings.enabled ? '' : 'off'}" title="Turn Extension ON / OFF">
            <span class="power-dot"></span>
            <span class="power-text">${settings.enabled ? 'ACTIVE' : 'OFF'}</span>
          </button>
          <button class="panel-close-btn" title="Close Panel (Esc)">${ICONS.close(14)}</button>
        </div>
      </header>

      <!-- Glass Action Controls -->
      <section class="panel-actions-section">
        <!-- 1-Click Master ZIP Download -->
        <button class="btn-monochrome-primary btn-download-zip" title="Package all full-res assets into uncompressed ZIP">
          ${ICONS.zip(16)}
          Download All as ZIP (${totalCount})
        </button>

        <div class="actions-row">
          <button class="btn-monochrome-secondary btn-select-all">${ICONS.check(13)} Select All</button>
          <button class="btn-monochrome-secondary btn-deselect-all">${ICONS.close(13)} Clear</button>
          <button class="btn-monochrome-secondary btn-download-selected" ${selectedCount === 0 ? 'disabled' : ''}>
            ${ICONS.download(13)} Selected (${selectedCount})
          </button>
        </div>

        <!-- Glass Search Input -->
        <input type="text" class="panel-search-box" placeholder="Filter jewelry by keyword..." value="${this.searchQuery}" />

        <!-- Glass Filter Chips -->
        <div class="filter-bar">
          <button class="filter-chip ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all">All (${totalCount})</button>
          ${
            videoCount > 0
              ? `<button class="filter-chip ${this.activeFilter === 'video' ? 'active' : ''}" data-filter="video">${ICONS.video(12)} Reels (${videoCount})</button>`
              : ''
          }
          <button class="filter-chip ${this.activeFilter === '4k' ? 'active' : ''}" data-filter="4k">${ICONS.sparkles(12)} 4K Master</button>
          <button class="filter-chip ${this.activeFilter === 'hd' ? 'active' : ''}" data-filter="hd">HD 1080p</button>
          <button class="filter-chip ${this.activeFilter === 'tanishq' ? 'active' : ''}" data-filter="tanishq">Tanishq</button>
          <button class="filter-chip ${this.activeFilter === 'instagram' ? 'active' : ''}" data-filter="instagram">Instagram</button>
          <button class="filter-chip ${this.activeFilter === 'etsy' ? 'active' : ''}" data-filter="etsy">Etsy</button>
          <button class="filter-chip ${this.activeFilter === 'shopify' ? 'active' : ''}" data-filter="shopify">Shopify</button>
        </div>
      </section>

      <!-- Media Grid -->
      <main class="panel-grid-container">
        <div class="panel-grid">
          ${
            visibleImages.length === 0
              ? `
              <div class="panel-empty-state">
                <div class="empty-gem">${ICONS.diamond(36)}</div>
                <p>No media matches the selected filter.</p>
              </div>
            `
              : ''
          }
        </div>
      </main>

      <!-- Glass Footer -->
      <footer class="panel-footer">
        <span class="footer-badge">${ICONS.sparkles(13)} 100% BIT-EXACT MASTER</span>
        <span>Click photo or reel to download</span>
      </footer>
    `;

    // Populate Cards
    const gridEl = this.drawerEl.querySelector('.panel-grid');
    if (gridEl && visibleImages.length > 0) {
      for (const img of visibleImages) {
        const card = this.createCardElement(img);
        gridEl.appendChild(card);
      }
    }

    this.attachDrawerEvents();
  }

  private createCardElement(img: DetectedImage): HTMLElement {
    const card = document.createElement('div');
    card.className = `panel-image-card ${img.selected ? 'selected' : ''}`;
    card.dataset.imageId = img.id;

    const isVideo = img.mediaType === 'video';
    const sourceTag = isVideo
      ? (img.sourceType === 'instagram' ? 'REEL' : 'VIDEO')
      : img.sourceType === 'etsy'
      ? 'ETSY'
      : img.sourceType === 'shopify'
      ? 'SHOPIFY'
      : img.sourceType === 'tanishq'
      ? 'TANISHQ'
      : img.sourceType === 'instagram'
      ? 'INSTA'
      : img.sourceType === 'scene7'
      ? 'MASTER'
      : 'HD';

    const resolution =
      img.naturalWidth && img.naturalHeight
        ? `${img.naturalWidth}×${img.naturalHeight}${isVideo ? ' MP4' : ''}`
        : `${img.width}×${img.height}${isVideo ? ' MP4' : ''}`;

    const thumbUrl = img.videoPoster || img.masterSrc;

    card.innerHTML = `
      <img class="panel-image-thumb" src="${thumbUrl}" alt="${img.altText || 'Media piece'}" loading="lazy" />

      ${isVideo ? `<div class="card-play-icon">${ICONS.play(18)}</div>` : ''}

      <!-- Top Overlay -->
      <div class="card-header-overlay">
        <span class="card-source-tag ${isVideo ? 'video-tag' : ''}">${sourceTag}</span>
        <div class="card-actions-top">
          <button class="card-copy-btn" title="Copy Direct Master Link">${ICONS.copy(12)}</button>
          <button class="card-zoom-btn" title="${isVideo ? 'Watch Reel' : 'Inspect Facets'}">${ICONS.zoom(12)}</button>
          <label class="card-checkbox-label" title="Select for bulk download">
            <input type="checkbox" class="card-checkbox" ${img.selected ? 'checked' : ''} />
            <span class="card-checkmark"></span>
          </label>
        </div>
      </div>

      <!-- Bottom Overlay with Explicit Single Download Button -->
      <div class="card-footer-overlay">
        <div class="card-footer-info">
          <span class="card-resolution">${resolution}</span>
        </div>
        <button class="card-btn-download ${isVideo ? 'video-dl' : ''}" title="${isVideo ? 'Download 1080p Video' : 'Download Master Photo'}">
          ${ICONS.download(11)}
          <span>${isVideo ? 'Reel' : 'Download'}</span>
        </button>
      </div>

      <!-- Download Status -->
      <div class="card-download-status">
        ${ICONS.check(24)}
        <span class="card-status-text">Downloaded</span>
      </div>
    `;

    // 1. Explicit Download Button Click
    const dlBtn = card.querySelector<HTMLButtonElement>('.card-btn-download');
    dlBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.triggerInstantDownload(card, img, dlBtn);
    });

    // 2. Instant Download on Card Click (Card stays OPEN, never closes)
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      if (
        target.closest('.card-checkbox-label') ||
        target.closest('.card-zoom-btn') ||
        target.closest('.card-copy-btn') ||
        target.closest('.card-btn-download')
      ) {
        return;
      }
      this.triggerInstantDownload(card, img, dlBtn);
    });

    // 3. Zoom Button Lightbox Click
    const zoomBtn = card.querySelector('.card-zoom-btn');
    zoomBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openLightbox(img);
    });

    // 4. Copy Direct Master URL Click
    const copyBtn = card.querySelector('.card-copy-btn');
    copyBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(img.masterSrc).then(() => {
        this.showToast('Copied Master HD link to clipboard!');
      });
    });

    // 5. Checkbox selection toggle
    const checkbox = card.querySelector<HTMLInputElement>('.card-checkbox');
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        img.selected = checkbox.checked;
        card.classList.toggle('selected', img.selected);
        this.onToggleImageSelect(img.id, img.selected);
      });
    }

    return card;
  }

  private triggerInstantDownload(card: HTMLElement, img: DetectedImage, dlBtn?: HTMLButtonElement | null) {
    if (dlBtn) {
      dlBtn.innerHTML = `${ICONS.spinner(11)}<span>Saving...</span>`;
      dlBtn.style.pointerEvents = 'none';
    }

    const statusOverlay = card.querySelector('.card-download-status');
    if (statusOverlay) {
      statusOverlay.classList.add('active');
      setTimeout(() => {
        statusOverlay.classList.remove('active');
      }, 1200);
    }

    const isVideo = img.mediaType === 'video';
    const typeDesc = isVideo ? 'Reel Video' : 'Master Photo';
    const defaultLabel = isVideo ? 'Reel' : 'Download';

    this.showToast(`Downloading ${typeDesc}: ${img.filename}`);
    this.onDownloadSingle(img);

    setTimeout(() => {
      if (dlBtn) {
        dlBtn.innerHTML = `${ICONS.check(11)}<span>Saved!</span>`;
        setTimeout(() => {
          dlBtn.innerHTML = `${ICONS.download(11)}<span>${defaultLabel}</span>`;
          dlBtn.style.pointerEvents = '';
        }, 1600);
      }
    }, 500);
  }

  private showToast(message: string) {
    const textEl = this.toastEl.querySelector('.toast-text');
    if (textEl) textEl.textContent = message;

    this.toastEl.classList.add('show');
    setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 2400);
  }

  private openLightbox(img: DetectedImage) {
    const mediaContainer = this.lightboxEl.querySelector('.lightbox-media-container');
    const lbRes = this.lightboxEl.querySelector('.lightbox-res');
    const lbSrc = this.lightboxEl.querySelector('.lightbox-src');
    const lbDl = this.lightboxEl.querySelector<HTMLButtonElement>('.btn-lightbox-download');

    if (mediaContainer) {
      if (img.mediaType === 'video') {
        mediaContainer.innerHTML = `
          <video controls autoplay class="lightbox-image" src="${img.masterSrc}" poster="${img.videoPoster || ''}">
            Your browser does not support HTML5 video.
          </video>
        `;
      } else {
        mediaContainer.innerHTML = `<img class="lightbox-image" src="${img.masterSrc}" alt="High-Res Inspection" />`;
      }
    }

    if (lbRes) lbRes.textContent = `${img.naturalWidth || img.width} × ${img.naturalHeight || img.height} px`;
    if (lbSrc) lbSrc.textContent = `Source: ${img.sourceType.toUpperCase()} ${img.mediaType === 'video' ? '(REEL)' : ''}`;

    if (lbDl) {
      lbDl.onclick = () => {
        this.onDownloadSingle(img);
        this.showToast(`Downloaded: ${img.filename}`);
      };
    }

    this.lightboxEl.classList.add('open');
  }

  private closeLightbox() {
    this.lightboxEl.classList.remove('open');
    const video = this.lightboxEl.querySelector('video');
    if (video) video.pause();
  }

  private attachDrawerEvents() {
    // Close button
    const closeBtn = this.drawerEl.querySelector('.panel-close-btn');
    closeBtn?.addEventListener('click', () => this.close());

    // Power Toggle Button
    const powerBtn = this.drawerEl.querySelector('.panel-power-btn');
    powerBtn?.addEventListener('click', () => {
      this.onToggleEnabled();
    });

    // Search Input
    const searchInput = this.drawerEl.querySelector<HTMLInputElement>('.panel-search-box');
    searchInput?.addEventListener('input', () => {
      this.searchQuery = searchInput.value;
      if (this.cachedImages && this.cachedSettings) {
        this.update(this.cachedImages, this.cachedSettings);
      }
    });

    // Download All ZIP
    const zipBtn = this.drawerEl.querySelector<HTMLButtonElement>('.btn-download-zip');
    zipBtn?.addEventListener('click', () => {
      zipBtn.innerHTML = `${ICONS.spinner(15)} Creating ZIP...`;
      this.showToast('Packaging all master assets into ZIP archive...');
      this.onDownloadAllZip();
      setTimeout(() => {
        if (zipBtn) {
          zipBtn.innerHTML = `${ICONS.check(15)} ZIP Started!`;
          setTimeout(() => {
            if (this.cachedImages && this.cachedSettings) {
              this.update(this.cachedImages, this.cachedSettings);
            }
          }, 1800);
        }
      }, 1000);
    });

    // Select All
    const selectAllBtn = this.drawerEl.querySelector('.btn-select-all');
    selectAllBtn?.addEventListener('click', () => this.onSelectAll());

    // Deselect All
    const deselectAllBtn = this.drawerEl.querySelector('.btn-deselect-all');
    deselectAllBtn?.addEventListener('click', () => this.onDeselectAll());

    // Download Selected
    const dlSelectedBtn = this.drawerEl.querySelector('.btn-download-selected');
    dlSelectedBtn?.addEventListener('click', () => {
      this.showToast('Downloading selected media items...');
      this.onDownloadSelected();
    });

    // Filter Chips
    const filterChips = this.drawerEl.querySelectorAll<HTMLButtonElement>('.filter-chip');
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        this.activeFilter = chip.dataset.filter || 'all';
        if (this.cachedImages && this.cachedSettings) {
          this.update(this.cachedImages, this.cachedSettings);
        }
      });
    });
  }

  public open() {
    this.isOpen = true;
    this.refreshDrawerContent();
    this.drawerEl.classList.add('open');
    this.backdropEl.classList.add('visible');
    this.triggerEl.classList.add('hidden');
  }

  public close() {
    this.isOpen = false;
    this.drawerEl.classList.remove('open');
    this.backdropEl.classList.remove('visible');
    this.triggerEl.classList.remove('hidden');
  }

  public toggleOpen() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
