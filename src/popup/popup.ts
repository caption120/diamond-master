import { DetectedImage, DownloadRequestMessage } from '../types';

let currentImages: DetectedImage[] = [];

/**
 * Safely sends a message to the content script.
 * If the content script is not running yet (e.g. tab opened before extension reload),
 * automatically injects content.js dynamically using chrome.scripting.
 */
async function safeSendMessage(tabId: number, message: any): Promise<any> {
  try {
    const res = await chrome.tabs.sendMessage(tabId, message);
    return res;
  } catch {
    // Attempt dynamic injection if receiving end does not exist
    try {
      if (chrome.scripting) {
        await chrome.scripting.executeScript({
          target: { tabId },
          files: ['content.js']
        });
        // Short pause for content script initialization
        await new Promise((r) => setTimeout(r, 120));
        return await chrome.tabs.sendMessage(tabId, message);
      }
    } catch {
      // Tab cannot be scripted (e.g. chrome:// internal pages)
    }
    return null;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let tab: chrome.tabs.Tab | undefined;

  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    tab = activeTab;
  } catch {
    // ignore
  }

  if (!tab || !tab.id) return;
  const tabId = tab.id;
  const tabUrl = tab.url || '';

  // Check if current tab is a restricted browser internal page
  const isRestrictedUrl =
    !tabUrl ||
    tabUrl.startsWith('chrome://') ||
    tabUrl.startsWith('chrome-extension://') ||
    tabUrl.startsWith('edge://') ||
    tabUrl.startsWith('about:') ||
    tabUrl.startsWith('view-source:');

  // Update source badge based on current website host
  const sourceTag = document.getElementById('sourceTag');
  if (sourceTag) {
    if (tabUrl.includes('etsy.com')) {
      sourceTag.textContent = 'ETSY MASTER';
      sourceTag.style.color = '#ea580c';
    } else if (tabUrl.includes('instagram.com')) {
      sourceTag.textContent = 'INSTA REEL/4K';
      sourceTag.style.color = '#e11d48';
    } else if (tabUrl.includes('shopify') || tabUrl.includes('myshopify')) {
      sourceTag.textContent = 'SHOPIFY RAW';
      sourceTag.style.color = '#16a34a';
    } else if (tabUrl.includes('tanishq.co.in') || tabUrl.includes('titan.co.in')) {
      sourceTag.textContent = 'TANISHQ 4K';
      sourceTag.style.color = '#ca8a04';
    } else {
      sourceTag.textContent = 'MASTER CLARITY';
    }
  }

  // Master Power Switch
  const masterToggle = document.getElementById('masterToggle') as HTMLInputElement;
  try {
    const stored = await chrome.storage.sync.get('diamond_settings');
    if (stored && stored.diamond_settings && stored.diamond_settings.enabled !== undefined) {
      if (masterToggle) masterToggle.checked = stored.diamond_settings.enabled;
    }
  } catch {
    // fallback
  }

  masterToggle?.addEventListener('change', async () => {
    const enabled = masterToggle.checked;
    try {
      await chrome.storage.sync.set({ diamond_settings: { enabled } });
      await safeSendMessage(tabId, { type: 'TOGGLE_ENABLED', enabled });
    } catch {
      // ignore
    }
  });

  if (isRestrictedUrl) {
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
      galleryGrid.innerHTML = `
        <div class="empty-state">
          Browser restrictions prevent extensions on internal system tabs.<br/><br/>
          Switch to any website (e.g. Tanishq, Etsy, Shopify, Instagram) to download 4K jewelry photos & videos!
        </div>
      `;
    }
    return;
  }

  // Request detected images from active content script (with dynamic auto-injection)
  const response = await safeSendMessage(tabId, { type: 'GET_PAGE_IMAGES' });
  if (response && response.images) {
    currentImages = response.images;
    renderStats();
    renderGallery();
  } else {
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
      galleryGrid.innerHTML = `
        <div class="empty-state">
          Scanning media assets... If nothing appears, please refresh this tab (F5).
        </div>
      `;
    }
  }

  // Button Listeners
  const btnOpenSidePanel = document.getElementById('btnOpenSidePanel');
  btnOpenSidePanel?.addEventListener('click', async () => {
    await safeSendMessage(tabId, { type: 'OPEN_SIDE_PANEL' });
    window.close();
  });

  const btnSelectAll = document.getElementById('btnSelectAll');
  btnSelectAll?.addEventListener('click', async () => {
    await safeSendMessage(tabId, { type: 'SELECT_ALL' });
    currentImages.forEach((img) => (img.selected = true));
    renderStats();
    renderGallery();
  });

  const btnDeselectAll = document.getElementById('btnDeselectAll');
  btnDeselectAll?.addEventListener('click', async () => {
    await safeSendMessage(tabId, { type: 'DESELECT_ALL' });
    currentImages.forEach((img) => (img.selected = false));
    renderStats();
    renderGallery();
  });

  const btnDownloadAll = document.getElementById('btnDownloadAll');
  btnDownloadAll?.addEventListener('click', async () => {
    if (currentImages.length === 0) return;

    btnDownloadAll.textContent = 'Packaging Master ZIP...';

    const selected = currentImages.filter((img) => img.selected);
    const targetImages = selected.length > 0 ? selected : currentImages;

    const pageTitle = (tab?.title || 'media').replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 30);
    const zipFilename = `${pageTitle}_master_collection.zip`;

    const msg: DownloadRequestMessage = {
      type: 'DOWNLOAD_BATCH',
      images: targetImages.map((img) => ({
        url: img.masterSrc || (img as any).url,
        filename: img.filename || `media_${img.id}.jpg`
      })),
      asZip: true,
      zipFilename
    };

    chrome.runtime.sendMessage(msg);

    setTimeout(() => {
      btnDownloadAll.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Download Started!
      `;
      setTimeout(() => {
        btnDownloadAll.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download All as ZIP
        `;
      }, 2000);
    }, 1000);
  });

  // Size Filter Select
  const minSizeSelect = document.getElementById('minSizeSelect') as HTMLSelectElement;
  minSizeSelect?.addEventListener('change', async () => {
    const minSize = parseInt(minSizeSelect.value, 10);
    await chrome.storage.sync.set({ diamond_settings: { minSize } });
    const resp = await safeSendMessage(tabId, {
      type: 'UPDATE_SETTINGS',
      settings: { minSize }
    });
    if (resp && resp.images) {
      currentImages = resp.images;
      renderStats();
      renderGallery();
    }
  });
});

function renderStats() {
  const imageCountEl = document.getElementById('imageCount');
  const selectedCountEl = document.getElementById('selectedCount');

  if (imageCountEl) imageCountEl.textContent = String(currentImages.length);

  const selectedCount = currentImages.filter((img) => img.selected).length;
  if (selectedCountEl) selectedCountEl.textContent = String(selectedCount);
}

function renderGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;

  if (currentImages.length === 0) {
    galleryGrid.innerHTML = `
      <div class="empty-state">
        No media found matching the current filter.
      </div>
    `;
    return;
  }

  galleryGrid.innerHTML = '';

  for (const img of currentImages) {
    const card = document.createElement('div');
    card.className = `gallery-card ${img.selected ? 'selected' : ''}`;

    const isVideo = img.mediaType === 'video';
    const thumbUrl = img.videoPoster || img.masterSrc || (img as any).url;
    const res = isVideo
      ? '1080p REEL'
      : img.qualityLabel || `${img.width}×${img.height}`;

    card.innerHTML = `
      <img src="${thumbUrl}" alt="${img.altText || 'Media item'}" loading="lazy" />
      <div class="gallery-card-badge">${res}</div>
      <div class="gallery-card-check"></div>
    `;

    card.addEventListener('click', () => {
      img.selected = !img.selected;
      card.classList.toggle('selected', img.selected);
      renderStats();
    });

    galleryGrid.appendChild(card);
  }
}
