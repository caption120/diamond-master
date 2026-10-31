(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();let o=[];async function m(i,e){try{return await chrome.tabs.sendMessage(i,e)}catch{try{if(chrome.scripting)return await chrome.scripting.executeScript({target:{tabId:i},files:["content.js"]}),await new Promise(n=>setTimeout(n,120)),await chrome.tabs.sendMessage(i,e)}catch{}return null}}document.addEventListener("DOMContentLoaded",async()=>{let i;try{const[s]=await chrome.tabs.query({active:!0,currentWindow:!0});i=s}catch{}if(!i||!i.id)return;const e=i.id,n=i.url||"",c=!n||n.startsWith("chrome://")||n.startsWith("chrome-extension://")||n.startsWith("edge://")||n.startsWith("about:")||n.startsWith("view-source:"),t=document.getElementById("sourceTag");t&&(n.includes("etsy.com")?(t.textContent="ETSY MASTER",t.style.color="#ea580c"):n.includes("instagram.com")?(t.textContent="INSTA REEL/4K",t.style.color="#e11d48"):n.includes("shopify")||n.includes("myshopify")?(t.textContent="SHOPIFY RAW",t.style.color="#16a34a"):n.includes("tanishq.co.in")||n.includes("titan.co.in")?(t.textContent="TANISHQ 4K",t.style.color="#ca8a04"):t.textContent="MASTER CLARITY");const r=document.getElementById("masterToggle");try{const s=await chrome.storage.sync.get("diamond_settings");s&&s.diamond_settings&&s.diamond_settings.enabled!==void 0&&r&&(r.checked=s.diamond_settings.enabled)}catch{}if(r==null||r.addEventListener("change",async()=>{const s=r.checked;try{await chrome.storage.sync.set({diamond_settings:{enabled:s}}),await m(e,{type:"TOGGLE_ENABLED",enabled:s})}catch{}}),c){const s=document.getElementById("galleryGrid");s&&(s.innerHTML=`
        <div class="empty-state">
          Browser restrictions prevent extensions on internal system tabs.<br/><br/>
          Switch to any website (e.g. Tanishq, Etsy, Shopify, Instagram) to download 4K jewelry photos & videos!
        </div>
      `);return}const a=await m(e,{type:"GET_PAGE_IMAGES"});if(a&&a.images)o=a.images,u(),f();else{const s=document.getElementById("galleryGrid");s&&(s.innerHTML=`
        <div class="empty-state">
          Scanning media assets... If nothing appears, please refresh this tab (F5).
        </div>
      `)}const h=document.getElementById("btnOpenSidePanel");h==null||h.addEventListener("click",async()=>{await m(e,{type:"OPEN_SIDE_PANEL"}),window.close()});const p=document.getElementById("btnSelectAll");p==null||p.addEventListener("click",async()=>{await m(e,{type:"SELECT_ALL"}),o.forEach(s=>s.selected=!0),u(),f()});const E=document.getElementById("btnDeselectAll");E==null||E.addEventListener("click",async()=>{await m(e,{type:"DESELECT_ALL"}),o.forEach(s=>s.selected=!1),u(),f()});const l=document.getElementById("btnDownloadAll");l==null||l.addEventListener("click",async()=>{if(o.length===0)return;l.textContent="Packaging Master ZIP...";const s=o.filter(d=>d.selected),g=s.length>0?s:o,v=`${((i==null?void 0:i.title)||"media").replace(/[^a-zA-Z0-9_-]+/g,"_").slice(0,30)}_master_collection.zip`,L={type:"DOWNLOAD_BATCH",images:g.map(d=>({url:d.masterSrc||d.url,filename:d.filename||`media_${d.id}.jpg`})),asZip:!0,zipFilename:v};chrome.runtime.sendMessage(L),setTimeout(()=>{l.innerHTML=`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Download Started!
      `,setTimeout(()=>{l.innerHTML=`
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download All as ZIP
        `},2e3)},1e3)});const y=document.getElementById("minSizeSelect");y==null||y.addEventListener("change",async()=>{const s=parseInt(y.value,10);await chrome.storage.sync.set({diamond_settings:{minSize:s}});const g=await m(e,{type:"UPDATE_SETTINGS",settings:{minSize:s}});g&&g.images&&(o=g.images,u(),f())})});function u(){const i=document.getElementById("imageCount"),e=document.getElementById("selectedCount");i&&(i.textContent=String(o.length));const n=o.filter(c=>c.selected).length;e&&(e.textContent=String(n))}function f(){const i=document.getElementById("galleryGrid");if(i){if(o.length===0){i.innerHTML=`
      <div class="empty-state">
        No media found matching the current filter.
      </div>
    `;return}i.innerHTML="";for(const e of o){const n=document.createElement("div");n.className=`gallery-card ${e.selected?"selected":""}`;const c=e.mediaType==="video",t=e.videoPoster||e.masterSrc||e.url,r=c?"1080p REEL":e.qualityLabel||`${e.width}×${e.height}`;n.innerHTML=`
      <img src="${t}" alt="${e.altText||"Media item"}" loading="lazy" />
      <div class="gallery-card-badge">${r}</div>
      <div class="gallery-card-check"></div>
    `,n.addEventListener("click",()=>{e.selected=!e.selected,n.classList.toggle("selected",e.selected),u()}),i.appendChild(n)}}}
