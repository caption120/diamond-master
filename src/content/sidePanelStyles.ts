export const SIDE_PANEL_STYLES = `
/* ==========================================================================
   Apple Glassmorphism Design System (macOS Tahoe & visionOS Aesthetics)
   100% Vector Icons | Frosted Acrylic | Specular Rim Lighting | Apple Springs
   ========================================================================== */

:host {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.45;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  z-index: 2147483647;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 0. Root Container Anchor */
.diamond-side-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2147483646;
  overflow: visible;
}

/* 1. Apple Floating Glass Trigger Tab */
.diamond-side-trigger {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: rgba(20, 20, 26, 0.65);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(255, 255, 255, 0.32);
  border-right: none;
  border-radius: 16px 0 0 16px;
  color: #ffffff;
  cursor: pointer;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), -8px 12px 36px rgba(0, 0, 0, 0.55);
  z-index: 2147483646;
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.diamond-side-trigger:hover {
  background: rgba(28, 28, 36, 0.85);
  border-color: rgba(255, 255, 255, 0.35);
  border-top-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%) translateX(-4px);
  box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.3), -12px 16px 44px rgba(0, 0, 0, 0.7);
}

.diamond-side-trigger.hidden {
  transform: translateY(-50%) translateX(100%);
  opacity: 0;
  pointer-events: none;
}

.trigger-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.trigger-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  text-align: left;
}

.trigger-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #ffffff;
}

.trigger-count {
  font-size: 10px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
}

/* 2. Apple Frosted Glass Side Panel Drawer */
.diamond-side-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 440px;
  max-width: 92vw;
  height: 100vh;
  background: rgba(16, 16, 20, 0.78);
  backdrop-filter: blur(48px) saturate(210%) contrast(105%);
  -webkit-backdrop-filter: blur(48px) saturate(210%) contrast(105%);
  border-left: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: inset 1px 0 1px 0 rgba(255, 255, 255, 0.12), -24px 0 64px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2147483647;
  pointer-events: auto;
}

.diamond-side-panel.open {
  transform: translateX(0);
}

/* Frosted Ambient Backdrop */
.diamond-side-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 2147483645;
}

.diamond-side-backdrop.visible {
  opacity: 1;
  pointer-events: auto;
}

/* Apple Glass Header */
.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo-gem {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  color: #ffffff;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.25);
}

.header-title-block {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #ffffff;
}

.header-meta {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Apple Power Pill Switch */
.panel-power-btn {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-top: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 9999px;
  padding: 5px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.panel-power-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.35);
}

.panel-power-btn .power-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 10px #34d399;
}

.panel-power-btn.off {
  border-color: rgba(248, 113, 113, 0.4);
  color: #f87171;
}

.panel-power-btn.off .power-dot {
  background: #ef4444;
  box-shadow: none;
}

.panel-close-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
}

.panel-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

/* Actions Section */
.panel-actions-section {
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(255, 255, 255, 0.02);
}

/* Apple Solid Glass Primary Action Button */
.btn-monochrome-primary {
  width: 100%;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(20px);
  color: #000000;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 12px;
  padding: 11px 16px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-monochrome-primary:hover {
  background: #ffffff;
  transform: translateY(-1.5px);
  box-shadow: 0 8px 28px rgba(255, 255, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 1);
}

.btn-monochrome-primary:active {
  transform: translateY(0);
}

/* Frosted Secondary Buttons */
.actions-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-monochrome-secondary {
  flex: 1;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(16px);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-top: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-monochrome-secondary:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.btn-monochrome-secondary:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none;
}

/* Glass Search Input */
.panel-search-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 10px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 11px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
}

.panel-search-box:focus {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.panel-search-box::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

/* Glass Filter Chips */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.filter-chip {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.filter-chip.active {
  background: rgba(255, 255, 255, 0.95);
  color: #000000;
  border-color: #ffffff;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.25);
}

.filter-chip:hover:not(.active) {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.25);
}

/* Glass Grid Container (GPU-accelerated, zero-stutter scrolling) */
.panel-grid-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
  will-change: transform;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Apple Squircle Media Card (Zero nested blur for buttery 120 FPS scrolling) */
.panel-image-card {
  position: relative;
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease;
  user-select: none;
  contain: content;
  content-visibility: auto;
  contain-intrinsic-size: 190px 190px;
}

.panel-image-card:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.panel-image-card.selected {
  border-color: #ffffff;
  box-shadow: 0 0 0 2px #ffffff, 0 8px 24px rgba(0, 0, 0, 0.6);
}

.panel-image-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel-image-card:hover .panel-image-thumb {
  transform: scale(1.06);
}

/* Video Play Overlay Badge */
.card-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(14, 14, 18, 0.85);
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  border-top: 1.5px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  pointer-events: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;
}

.panel-image-card:hover .card-play-icon {
  background: #ffffff;
  color: #000000;
  border-color: #ffffff;
  transform: translate(-50%, -50%) scale(1.15);
}

/* Card Header Floating Pills */
.card-header-overlay {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 3;
}

.card-source-tag {
  background: rgba(10, 10, 14, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 6px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.card-source-tag.video-tag {
  background: rgba(220, 38, 38, 0.9);
  border-color: rgba(255, 255, 255, 0.4);
}

.card-actions-top {
  display: flex;
  align-items: center;
  gap: 5px;
  pointer-events: auto;
}

.card-zoom-btn, .card-copy-btn {
  background: rgba(10, 10, 14, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.card-zoom-btn:hover, .card-copy-btn:hover {
  background: #ffffff;
  color: #000000;
  border-color: #ffffff;
  transform: scale(1.1);
}

/* Apple Custom Checkbox */
.card-checkbox-label {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.card-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.card-checkmark {
  width: 20px;
  height: 20px;
  background: rgba(10, 10, 14, 0.88);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  border-radius: 6px;
  display: inline-block;
  position: relative;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-checkbox:checked ~ .card-checkmark {
  background: #ffffff;
  border-color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.card-checkbox:checked ~ .card-checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2.5px;
  width: 4px;
  height: 9px;
  border: solid #000000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Card Bottom Overlay Details */
.card-footer-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(10, 10, 14, 0.98) 0%, rgba(10, 10, 14, 0.75) 75%, transparent 100%);
  padding: 8px 10px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  z-index: 3;
}

.card-footer-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.card-resolution {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-btn-download {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 23px;
  padding: 0 9px;
  background: #ffffff;
  color: #000000;
  font-family: inherit;
  font-size: 10.5px;
  font-weight: 700;
  border-radius: 9999px;
  border: 1px solid #ffffff;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.card-btn-download:hover {
  background: #f0f0f5;
  transform: translateY(-1px) scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.4);
}

.card-btn-download:active {
  transform: scale(0.96);
}

.card-btn-download.video-dl {
  background: #ffffff;
  color: #000000;
}

/* Download Feedback Status */
.card-download-status {
  position: absolute;
  inset: 0;
  background: rgba(12, 12, 16, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 5;
}

.card-download-status.active {
  opacity: 1;
}

.card-status-text {
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.4px;
}

/* Empty State */
.panel-empty-state {
  grid-column: span 2;
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-gem {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
}

/* Apple Frosted Toast Notification */
.diamond-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: rgba(22, 22, 28, 0.88);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2147483648;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  pointer-events: none;
  opacity: 0;
}

.diamond-toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Apple Fullscreen Lightbox Modal */
.diamond-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 12, 0.85);
  backdrop-filter: blur(36px) saturate(200%);
  -webkit-backdrop-filter: blur(36px) saturate(200%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 2147483649;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.diamond-lightbox.open {
  opacity: 1;
  pointer-events: auto;
}

.lightbox-close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-top: 1px solid rgba(255, 255, 255, 0.45);
  color: #ffffff;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.lightbox-close-btn:hover {
  background: #ffffff;
  color: #000000;
  transform: scale(1.1);
}

.lightbox-image-wrap {
  max-width: 90vw;
  max-height: 84vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.lightbox-media-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 74vh;
}

.lightbox-image {
  max-width: 100%;
  max-height: 74vh;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.85);
}

.lightbox-details {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Glass Footer */
.panel-footer {
  padding: 14px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
}

.footer-badge {
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Smooth Spinner */
.dm-spin {
  animation: dm-spin-kf 0.9s linear infinite;
}

@keyframes dm-spin-kf {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
