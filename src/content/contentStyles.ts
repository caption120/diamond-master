export const CONTENT_STYLES = `
/* ==========================================================================
   Apple Glassmorphism Overlay Badges (On-Page Media Markers)
   100% Vector Icons | Frosted Capsule | Specular Rim Lighting
   ========================================================================== */

:host {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 1.4;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  z-index: 2147483647;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Floating Badges on Images */
.diamond-overlays-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  pointer-events: none;
  z-index: 2147483640;
}

.diamond-badge {
  position: absolute;
  pointer-events: auto;
  z-index: 2147483642;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.diamond-badge:hover {
  transform: translateY(-2px) scale(1.02);
}

.diamond-badge-inner {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  background: rgba(18, 18, 24, 0.76);
  backdrop-filter: blur(28px) saturate(200%);
  -webkit-backdrop-filter: blur(28px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 9999px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 24px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.diamond-badge:hover .diamond-badge-inner {
  background: rgba(28, 28, 36, 0.9);
  border-color: rgba(255, 255, 255, 0.38);
}

.diamond-badge.is-selected .diamond-badge-inner {
  background: rgba(255, 255, 255, 0.95);
  border-color: #ffffff;
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.5);
}

.diamond-badge.is-selected .diamond-res,
.diamond-badge.is-selected .diamond-action-btn {
  color: #000000;
}

.diamond-badge.is-selected .diamond-action-btn {
  background: rgba(0, 0, 0, 0.08);
}

.diamond-badge.is-selected .diamond-action-btn:hover {
  background: #000000;
  color: #ffffff;
}

/* Apple Custom Checkbox */
.diamond-checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.diamond-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.diamond-checkmark {
  width: 17px;
  height: 17px;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  border-radius: 5px;
  display: inline-block;
  position: relative;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.diamond-checkbox:checked ~ .diamond-checkmark {
  background: #ffffff;
  border-color: #ffffff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}

.diamond-checkbox:checked ~ .diamond-checkmark::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid #000000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Badge Info & Tags */
.diamond-badge-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.diamond-tag {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.diamond-tag.etsy { background: #ea580c; color: #fff; }
.diamond-tag.shopify { background: #16a34a; color: #fff; }
.diamond-tag.tanishq { background: #d97706; color: #fff; font-weight: 800; }
.diamond-tag.insta { background: #e11d48; color: #fff; }
.diamond-tag.master { background: #ffffff; color: #000000; }

.diamond-res {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.2px;
}

/* Direct Action Buttons inside Badge (Instagram Reels, Photos & Carousels) */
.dm-direct-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dm-direct-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 10px;
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  user-select: none;
  outline: none;
}

.dm-direct-action-btn.dm-btn-primary {
  background: #ffffff;
  color: #000000;
  border: 1px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.dm-direct-action-btn.dm-btn-primary:hover {
  background: #f0f0f5;
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.35);
}

.dm-direct-action-btn.dm-btn-secondary {
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-top: 1px solid rgba(255, 255, 255, 0.45);
}

.dm-direct-action-btn.dm-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.28);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-1px) scale(1.03);
}

.dm-direct-action-btn.dm-btn-icon {
  width: 26px;
  height: 26px;
  padding: 0;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 50%;
}

.dm-direct-action-btn.dm-btn-icon:hover {
  background: #ffffff;
  color: #000000;
  border-color: #ffffff;
  transform: translateY(-1px) scale(1.08);
}

.dm-direct-action-btn:active {
  transform: scale(0.96);
}

.dm-spin {
  animation: dmSpin 0.8s linear infinite;
}

@keyframes dmSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Action Buttons inside Badge */
.diamond-action-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.diamond-action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.diamond-download-btn:hover {
  background: #ffffff;
  color: #000000;
}
`;
