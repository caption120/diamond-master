import { DetectedImage, ExtensionSettings } from '../types';
import { ICONS } from '../utils/icons';

export class FloatingToolbar {
  private shadowRoot: ShadowRoot;
  private toolbarEl: HTMLDivElement;
  private isMinimized: boolean = false;

  private onSelectAll: () => void;
  private onDeselectAll: () => void;
  private onDownloadSelected: () => void;
  private onDownloadAllZip: () => void;
  private onUpdateFilter: (minSize: number) => void;
  private onToggleBadges: () => void;

  constructor(
    shadowRoot: ShadowRoot,
    handlers: {
      onSelectAll: () => void;
      onDeselectAll: () => void;
      onDownloadSelected: () => void;
      onDownloadAllZip: () => void;
      onUpdateFilter: (minSize: number) => void;
      onToggleBadges: () => void;
    }
  ) {
    this.shadowRoot = shadowRoot;
    this.onSelectAll = handlers.onSelectAll;
    this.onDeselectAll = handlers.onDeselectAll;
    this.onDownloadSelected = handlers.onDownloadSelected;
    this.onDownloadAllZip = handlers.onDownloadAllZip;
    this.onUpdateFilter = handlers.onUpdateFilter;
    this.onToggleBadges = handlers.onToggleBadges;

    this.toolbarEl = document.createElement('div');
    this.toolbarEl.className = 'diamond-dock';
    this.shadowRoot.appendChild(this.toolbarEl);
  }

  public update(images: DetectedImage[], settings: ExtensionSettings) {
    const totalCount = images.length;
    const selectedCount = images.filter((img) => img.selected).length;

    this.toolbarEl.innerHTML = `
      <div class="diamond-dock-container ${this.isMinimized ? 'minimized' : ''}">
        <!-- Minimize Pill -->
        <button class="diamond-dock-toggle-btn" title="${this.isMinimized ? 'Expand Toolbar' : 'Minimize Toolbar'}">
          <span class="diamond-gem-icon">${ICONS.diamond(14)}</span>
          <span class="diamond-dock-badge-count">${selectedCount > 0 ? `${selectedCount}/${totalCount}` : totalCount}</span>
        </button>

        <!-- Main Dock Contents -->
        <div class="diamond-dock-content">
          <div class="diamond-dock-title">
            <span class="diamond-title-text">Diamond Master</span>
            <span class="diamond-count-pill">${totalCount} images</span>
          </div>

          <!-- Selection Action Buttons -->
          <div class="diamond-dock-actions">
            <button class="diamond-btn diamond-btn-secondary btn-select-all" title="Select all detected images">
              ${ICONS.check(13)} Select All
            </button>
            <button class="diamond-btn diamond-btn-ghost btn-deselect-all" title="Clear selection">
              ${ICONS.close(13)} Clear
            </button>
          </div>

          <!-- Size Filter Presets -->
          <div class="diamond-dock-filters" title="Filter by minimum dimension">
            <span class="filter-label">Min:</span>
            <button class="filter-chip ${settings.minSize <= 200 ? 'active' : ''}" data-size="200">200px</button>
            <button class="filter-chip ${settings.minSize === 400 ? 'active' : ''}" data-size="400">400px</button>
            <button class="filter-chip ${settings.minSize >= 800 ? 'active' : ''}" data-size="800">800px (HD)</button>
          </div>

          <!-- Download Action Buttons -->
          <div class="diamond-dock-downloads">
            <button class="diamond-btn diamond-btn-primary btn-download-selected" ${selectedCount === 0 ? 'disabled' : ''}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download Selected (${selectedCount})</span>
            </button>

            <button class="diamond-btn diamond-btn-gold btn-download-all-zip" title="1-Click Download Entire Page as High-Res ZIP">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download All (ZIP)</span>
            </button>
          </div>

          <!-- Toggle Marks Visibility -->
          <button class="diamond-btn-icon btn-toggle-badges" title="${settings.showBadges ? 'Hide Badges on Page' : 'Show Badges on Page'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${
                settings.showBadges
                  ? `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`
                  : `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
              }
            </svg>
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    // Toggle minimize
    const toggleBtn = this.toolbarEl.querySelector('.diamond-dock-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.isMinimized = !this.isMinimized;
        const container = this.toolbarEl.querySelector('.diamond-dock-container');
        if (container) container.classList.toggle('minimized', this.isMinimized);
      });
    }

    // Select All
    const selectAllBtn = this.toolbarEl.querySelector('.btn-select-all');
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => this.onSelectAll());
    }

    // Deselect All
    const deselectAllBtn = this.toolbarEl.querySelector('.btn-deselect-all');
    if (deselectAllBtn) {
      deselectAllBtn.addEventListener('click', () => this.onDeselectAll());
    }

    // Download Selected
    const dlSelectedBtn = this.toolbarEl.querySelector('.btn-download-selected');
    if (dlSelectedBtn) {
      dlSelectedBtn.addEventListener('click', () => this.onDownloadSelected());
    }

    // Download All ZIP
    const dlAllZipBtn = this.toolbarEl.querySelector('.btn-download-all-zip');
    if (dlAllZipBtn) {
      dlAllZipBtn.addEventListener('click', () => this.onDownloadAllZip());
    }

    // Filter Chips
    const filterChips = this.toolbarEl.querySelectorAll<HTMLButtonElement>('.filter-chip');
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const size = parseInt(chip.dataset.size || '200', 10);
        this.onUpdateFilter(size);
      });
    });

    // Toggle Badges
    const toggleBadgesBtn = this.toolbarEl.querySelector('.btn-toggle-badges');
    if (toggleBadgesBtn) {
      toggleBadgesBtn.addEventListener('click', () => this.onToggleBadges());
    }
  }

  public setVisible(visible: boolean) {
    this.toolbarEl.style.display = visible ? 'block' : 'none';
  }
}
