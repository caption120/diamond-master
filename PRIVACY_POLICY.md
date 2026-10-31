# Privacy Policy & Data Protection Statement

**Diamond Master - 4K Image & Reel Downloader**  
**Lead Developer & Maintainer:** Gautam Bhayani  
**Intended Scope:** Developed for internal evaluation, authorized media asset management, and research purposes.  
**Effective Date:** October 31, 2026  

---

## 1. Core Commitment: Zero Data Collection
Diamond Master is engineered with privacy as a foundational principle. **Gautam Bhayani does not collect, record, track, transmit, store, sell, monetize, or share any personal data, browsing history, account credentials, IP addresses, or device identifiers under any circumstances.**

## 2. 100% Client-Side In-Browser Execution
All scanning, resolution upgrading, DOM inspection, and file saving operations execute **exclusively inside your local browser sandbox**:
- **No Remote Telemetry or Tracking Servers**: The extension contains zero tracking analytics, zero remote pings, zero advertising SDKs, and zero external telemetry endpoints.
- **Direct Origin Communication**: Any image or video asset requested is delivered directly from the original public Content Delivery Network (CDN) to your local machine.
- **Local Settings Storage (`chrome.storage.sync`)**: Persists only non-sensitive visual configuration preferences (e.g., UI toggle state, minimum image dimension filter). No personally identifiable information (PII) is ever stored.
- **Local File System Saving (`chrome.downloads`)**: Used solely to stream user-selected media assets directly into the user's designated local `Downloads` directory.

## 3. Justification of Browser Permissions
- `downloads`: Required exclusively to write the high-resolution media files and ZIP archives requested by the user into the local device download folder.
- `storage`: Required exclusively to retain user preference flags (e.g., minimum size filter, active panel state) locally within the browser.
- `activeTab` & `scripting`: Required to inspect the visual DOM of the tab currently active in the user's browser to locate publicly visible media elements.
- `<all_urls>`: Required to allow the tool to function across independent e-commerce storefronts and social platforms without domain-locking.

## 4. Compliance & Safe Harbor
This extension operates within standard browser capabilities and does not exploit vulnerabilities, intercept encrypted network traffic, or violate user privacy.

---

## Contact
For questions regarding this privacy policy or technical inquiries, contact the developer:
- **Developer:** Gautam Bhayani
- **Email:** gautambhayani107@gmail.com
- **Repository:** https://github.com/caption120/diamond-master
