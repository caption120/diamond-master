import JSZip from 'jszip';
import { DownloadRequestMessage } from '../types';

chrome.runtime.onInstalled.addListener(() => {
  console.log('[Diamond Clarity Master Downloader] Extension installed successfully.');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message: DownloadRequestMessage, sender, sendResponse) => {
  if (message.type === 'DOWNLOAD_SINGLE') {
    handleSingleDownload(message.images[0]);
    sendResponse({ success: true });
  } else if (message.type === 'DOWNLOAD_BATCH') {
    if (message.asZip) {
      handleZipDownload(message.images, message.zipFilename || 'diamond_master_images.zip');
    } else {
      handleMultipleDirectDownloads(message.images);
    }
    sendResponse({ success: true });
  }
  return true;
});

/**
 * Downloads a single image directly via Chrome Downloads API (100% bit-exact).
 */
function handleSingleDownload(item: { url: string; filename: string }) {
  // 1. Sanitize filename: strip query strings & forbidden filesystem characters
  let cleanName = item.filename ? item.filename.split('?')[0].split('#')[0] : 'jewelry_media.jpg';
  cleanName = cleanName.replace(/[<>:"/\\|?*]/g, '_').trim();
  if (!cleanName || cleanName === '_') cleanName = 'jewelry_media.jpg';

  chrome.downloads.download(
    {
      url: item.url,
      filename: `DiamondMaster/${cleanName}`,
      conflictAction: 'uniquify',
      saveAs: false
    },
    (downloadId) => {
      if (chrome.runtime.lastError) {
        console.warn('[Diamond Clarity] Direct download failed, fetching blob fallback:', chrome.runtime.lastError);
        // Fallback: Fetch blob directly in service worker without opening disruptive new tabs!
        fetchBlobAndDownload(item.url, cleanName);
      }
    }
  );
}

/**
 * Fallback blob download for cross-origin or restricted CDN streams.
 */
async function fetchBlobAndDownload(url: string, filename: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });

    if (!response.ok) return;

    const blob = await response.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (dataUrl) {
        chrome.downloads.download({
          url: dataUrl,
          filename: `DiamondMaster/${filename}`,
          conflictAction: 'uniquify',
          saveAs: false
        });
      }
    };
    reader.readAsDataURL(blob);
  } catch (err) {
    console.error('[Diamond Clarity] Blob fallback failed:', err);
  }
}

/**
 * Downloads multiple files sequentially.
 */
function handleMultipleDirectDownloads(items: Array<{ url: string; filename: string }>) {
  let delay = 0;
  for (const item of items) {
    setTimeout(() => {
      handleSingleDownload(item);
    }, delay);
    delay += 250; // Stagger to avoid browser download floods
  }
}

/**
 * Bundles all high-resolution images into an uncompressed/lossless ZIP archive.
 */
async function handleZipDownload(
  items: Array<{ url: string; filename: string }>,
  zipFilename: string
) {
  const zip = new JSZip();
  const folder = zip.folder('Master_Jewelry_Images') || zip;

  let successfulCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      let referer = '';
      try {
        const parsed = new URL(item.url);
        referer = `${parsed.protocol}//${parsed.host}/`;
      } catch {
        // ignore
      }

      const response = await fetch(item.url, {
        method: 'GET',
        credentials: 'omit',
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          ...(referer ? { Referer: referer } : {})
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const blob = await response.blob();
      folder.file(item.filename, blob);
      successfulCount++;
    } catch (err) {
      console.warn(`[Diamond Clarity] Failed to fetch into zip: ${item.url}`, err);
      // Fallback: trigger single download if zip fetch was blocked
      handleSingleDownload(item);
    }
  }

  if (successfulCount > 0) {
    try {
      const zipContent = await zip.generateAsync({
        type: 'base64',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });

      const dataUrl = `data:application/zip;base64,${zipContent}`;

      chrome.downloads.download({
        url: dataUrl,
        filename: `DiamondMaster/${zipFilename}`,
        conflictAction: 'uniquify',
        saveAs: false
      });
    } catch (zipErr) {
      console.error('[Diamond Clarity] Failed to generate zip:', zipErr);
      // Fallback to direct downloads
      handleMultipleDirectDownloads(items);
    }
  }
}
