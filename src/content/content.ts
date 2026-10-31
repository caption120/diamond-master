import { DetectedImage, ExtensionSettings, DownloadRequestMessage, ToggleMessage } from '../types';
import { scanPageForImages } from '../utils/domScanner';
import { CONTENT_STYLES } from './contentStyles';
import { SIDE_PANEL_STYLES } from './sidePanelStyles';
import { OverlayManager } from './overlayManager';
import { SidePanel } from './sidePanel';

class DiamondClarityContentScript {
  private hostEl: HTMLDivElement | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private overlayManager: OverlayManager | null = null;
  private sidePanel: SidePanel | null = null;

  private detectedImages: DetectedImage[] = [];
  private settings: ExtensionSettings = {
    enabled: true,
    minSize: 100,
    showBadges: true,
    autoUpgradeUrls: true,
    downloadAsZip: true,
    namingPattern: 'jewelry'
  };

  private scanDebounceTimer: number | null = null;
  private observer: MutationObserver | null = null;
  private warmUpInterval: number | null = null;
  private isRafPending: boolean = false;

  constructor() {
    this.init();
  }

  private async init() {
    // Load stored settings if available
    try {
      if (chrome.storage && chrome.storage.sync) {
        const stored = await chrome.storage.sync.get('diamond_settings');
        if (stored && stored.diamond_settings) {
          this.settings = { ...this.settings, ...stored.diamond_settings };
        }
      }
    } catch {
      // Fallback to defaults
    }

    this.setupShadowDOM();
    this.setupListeners();

    if (this.settings.enabled) {
      try {
        this.scanAndRender();
      } catch (err) {
        console.warn('Diamond Master: Init scan caught', err);
      }
      this.setupMutationObserver();
      this.startWarmUp();
    } else {
      if (this.sidePanel) {
        this.sidePanel.update([], this.settings);
      }
    }

    // High performance RAF-throttled scroll listener
    window.addEventListener(
      'scroll',
      () => {
        if (!this.settings.enabled || this.isRafPending) return;
        this.isRafPending = true;
        window.requestAnimationFrame(() => {
          if (this.overlayManager) this.overlayManager.updatePositions();
          this.isRafPending = false;
        });
      },
      { passive: true }
    );
  }

  private setupShadowDOM() {
    if (document.getElementById('diamond-clarity-root')) return;

    const parent = document.documentElement || document.body;
    if (!parent) return;

    this.hostEl = document.createElement('div');
    this.hostEl.id = 'diamond-clarity-root';
    this.hostEl.style.cssText =
      'all: initial; position: absolute; top: 0; left: 0; width: 100%; height: 0; z-index: 2147483647; pointer-events: none;';
    parent.appendChild(this.hostEl);

    this.shadowRoot = this.hostEl.attachShadow({ mode: 'open' });

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `${CONTENT_STYLES}\n${SIDE_PANEL_STYLES}`;
    this.shadowRoot.appendChild(styleEl);

    // Initialize On-page Badges
    this.overlayManager = new OverlayManager(
      this.shadowRoot,
      (imageId, selected) => this.handleImageSelectToggle(imageId, selected),
      (image) => this.handleDownloadSingle(image)
    );

    // Initialize Luxury Side Panel Drawer
    this.sidePanel = new SidePanel(this.shadowRoot, {
      onDownloadSingle: (image) => this.handleDownloadSingle(image),
      onDownloadAllZip: () => this.handleDownloadAllZip(),
      onDownloadSelected: () => this.handleDownloadSelected(),
      onSelectAll: () => this.handleSelectAll(),
      onDeselectAll: () => this.handleDeselectAll(),
      onToggleImageSelect: (imageId, selected) => this.handleImageSelectToggle(imageId, selected),
      onToggleEnabled: () => this.handleToggleEnabled()
    });
  }

  private startWarmUp() {
    let scanPass = 0;
    this.warmUpInterval = window.setInterval(() => {
      scanPass++;
      if (this.settings.enabled) {
        this.scanAndRender();
      }
      if (scanPass >= 5 && this.warmUpInterval) {
        window.clearInterval(this.warmUpInterval);
        this.warmUpInterval = null;
      }
    }, 1500);
  }

  private scanAndRender() {
    if (!this.settings.enabled) return;

    try {
      const previousSelectionMap = new Map<string, boolean>();
      for (let i = 0; i < this.detectedImages.length; i++) {
        const img = this.detectedImages[i];
        if (img.selected) previousSelectionMap.set(img.masterSrc, true);
      }

      this.detectedImages = scanPageForImages(this.settings);

      // Restore selection state
      for (let i = 0; i < this.detectedImages.length; i++) {
        const img = this.detectedImages[i];
        if (previousSelectionMap.get(img.masterSrc)) {
          img.selected = true;
        }
      }

      if (this.overlayManager) {
        this.overlayManager.renderBadges(this.detectedImages, this.settings.showBadges);
      }

      if (this.sidePanel) {
        this.sidePanel.update(this.detectedImages, this.settings);
      }
    } catch (err) {
      console.warn('Diamond Master: scanAndRender caught', err);
    }
  }

  private scheduleScan() {
    if (!this.settings.enabled) return;

    if (this.scanDebounceTimer) {
      window.clearTimeout(this.scanDebounceTimer);
    }
    this.scanDebounceTimer = window.setTimeout(() => {
      this.scanAndRender();
    }, 500);
  }

  private setupMutationObserver() {
    if (this.observer) this.observer.disconnect();

    this.observer = new MutationObserver((mutations) => {
      // Check if mutations contain actual image or video additions
      let shouldScan = false;
      for (let i = 0; i < mutations.length; i++) {
        const m = mutations[i];
        if (m.type === 'childList' && m.addedNodes.length > 0) {
          shouldScan = true;
          break;
        } else if (m.type === 'attributes') {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        this.scheduleScan();
      }
    });

    const target = document.documentElement || document.body;
    if (target) {
      this.observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'srcset', 'data-src', 'poster']
      });
    }
  }

  private setupListeners() {
    chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
      if (message.type === 'SELECT_ALL') {
        this.handleSelectAll();
        sendResponse({ success: true, count: this.detectedImages.length });
      } else if (message.type === 'DESELECT_ALL') {
        this.handleDeselectAll();
        sendResponse({ success: true });
      } else if (message.type === 'DOWNLOAD_ALL') {
        this.handleDownloadAllZip();
        sendResponse({ success: true, count: this.detectedImages.length });
      } else if (message.type === 'TOGGLE_OVERLAY') {
        this.handleToggleBadges();
        sendResponse({ success: true, showBadges: this.settings.showBadges });
      } else if (message.type === 'TOGGLE_ENABLED') {
        this.handleToggleEnabled(message.enabled);
        sendResponse({ success: true, enabled: this.settings.enabled });
      } else if (message.type === 'OPEN_SIDE_PANEL') {
        if (this.sidePanel) this.sidePanel.open();
        sendResponse({ success: true });
      } else if (message.type === 'GET_PAGE_IMAGES') {
        sendResponse({
          images: this.detectedImages.map((img) => ({
            id: img.id,
            url: img.masterSrc,
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height,
            qualityLabel: img.qualityLabel,
            sourceType: img.sourceType,
            selected: img.selected,
            filename: img.filename,
            mediaType: img.mediaType || 'image',
            videoPoster: img.videoPoster
          })),
          settings: this.settings
        });
      } else if (message.type === 'UPDATE_SETTINGS') {
        if (message.settings) {
          this.settings = { ...this.settings, ...message.settings };
          this.saveSettings();
          this.scanAndRender();
        }
        sendResponse({
          success: true,
          images: this.detectedImages.map((img) => ({
            id: img.id,
            url: img.masterSrc,
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height,
            qualityLabel: img.qualityLabel,
            sourceType: img.sourceType,
            selected: img.selected,
            filename: img.filename,
            mediaType: img.mediaType || 'image',
            videoPoster: img.videoPoster
          }))
        });
      }
      return true;
    });
  }

  private handleToggleEnabled(forcedState?: boolean) {
    this.settings.enabled = forcedState !== undefined ? forcedState : !this.settings.enabled;
    this.saveSettings();

    if (!this.settings.enabled) {
      if (this.observer) this.observer.disconnect();
      if (this.warmUpInterval) {
        window.clearInterval(this.warmUpInterval);
        this.warmUpInterval = null;
      }
      if (this.overlayManager) this.overlayManager.renderBadges([], false);
      if (this.sidePanel) this.sidePanel.update([], this.settings);
    } else {
      this.setupMutationObserver();
      this.scanAndRender();
      this.startWarmUp();
    }
  }

  private handleImageSelectToggle(imageId: string, selected: boolean) {
    const target = this.detectedImages.find((img) => img.id === imageId);
    if (target) {
      target.selected = selected;
    }
    if (this.overlayManager) {
      this.overlayManager.updateSelectionState(this.detectedImages);
    }
    if (this.sidePanel) {
      this.sidePanel.update(this.detectedImages, this.settings);
    }
  }

  private handleSelectAll() {
    for (let i = 0; i < this.detectedImages.length; i++) {
      this.detectedImages[i].selected = true;
    }
    if (this.overlayManager) {
      this.overlayManager.updateSelectionState(this.detectedImages);
    }
    if (this.sidePanel) {
      this.sidePanel.update(this.detectedImages, this.settings);
    }
  }

  private handleDeselectAll() {
    for (let i = 0; i < this.detectedImages.length; i++) {
      this.detectedImages[i].selected = false;
    }
    if (this.overlayManager) {
      this.overlayManager.updateSelectionState(this.detectedImages);
    }
    if (this.sidePanel) {
      this.sidePanel.update(this.detectedImages, this.settings);
    }
  }

  private handleToggleBadges() {
    this.settings.showBadges = !this.settings.showBadges;
    this.saveSettings();
    if (this.overlayManager) {
      this.overlayManager.renderBadges(this.detectedImages, this.settings.showBadges);
    }
  }

  private handleDownloadSingle(image: DetectedImage) {
    const msg: DownloadRequestMessage = {
      type: 'DOWNLOAD_SINGLE',
      images: [
        {
          url: image.masterSrc,
          filename: image.filename
        }
      ]
    };
    chrome.runtime.sendMessage(msg);
  }

  private handleDownloadSelected() {
    const selected = this.detectedImages.filter((img) => img.selected);
    if (selected.length === 0) return;

    if (selected.length === 1) {
      this.handleDownloadSingle(selected[0]);
      return;
    }

    const host = window.location.hostname.replace('www.', '').split('.')[0] || 'media';
    const pageTitle = (document.title || host).replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 30);
    const zipFilename = `${pageTitle}_master_collection.zip`;

    const msg: DownloadRequestMessage = {
      type: 'DOWNLOAD_BATCH',
      images: selected.map((img) => ({
        url: img.masterSrc,
        filename: img.filename
      })),
      asZip: true,
      zipFilename
    };
    chrome.runtime.sendMessage(msg);
  }

  private handleDownloadAllZip() {
    if (this.detectedImages.length === 0) return;

    const host = window.location.hostname.replace('www.', '').split('.')[0] || 'media';
    const pageTitle = (document.title || host).replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 30);
    const zipFilename = `${pageTitle}_all_master_media.zip`;

    const msg: DownloadRequestMessage = {
      type: 'DOWNLOAD_BATCH',
      images: this.detectedImages.map((img) => ({
        url: img.masterSrc,
        filename: img.filename
      })),
      asZip: true,
      zipFilename
    };
    chrome.runtime.sendMessage(msg);
  }

  private saveSettings() {
    try {
      if (chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set({ diamond_settings: this.settings });
      }
    } catch {
      // ignore
    }
  }
}

// Instantiate on content script load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new DiamondClarityContentScript());
} else {
  new DiamondClarityContentScript();
}
