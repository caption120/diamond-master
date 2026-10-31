var ae=Object.defineProperty;var ie=(x,k,S)=>k in x?ae(x,k,{enumerable:!0,configurable:!0,writable:!0,value:S}):x[k]=S;var f=(x,k,S)=>ie(x,typeof k!="symbol"?k+"":k,S);(function(){"use strict";class x{static upgrade(e,s){if(!e||typeof e!="string")return{url:"",sourceType:"standard",isUpgraded:!1,qualityTier:"Standard"};let t=e.trim();const i=typeof window<"u"&&window.location?window.location.hostname:"",r=typeof window<"u"&&window.location?window.location.href:"http://localhost";if(s){const o=this.inspectElementZoomAttributes(s);o&&(t=o)}if(t.includes("etsystatic.com")||i.includes("etsy.com")){const o=/\/il_\d+x[0-9N]+\./i;return o.test(t)?{url:t.replace(o,"/il_fullxfull."),sourceType:"etsy",isUpgraded:!0,qualityTier:"4K Master"}:{url:t,sourceType:"etsy",isUpgraded:!1,qualityTier:"Ultra HD"}}if(t.includes("cdn.shopify.com")||t.includes("/cdn/shop/")||t.includes("/s/files/")||t.includes("myshopify.com")||t.includes("/products/")||typeof window<"u"&&(!!window.Shopify||!!document.querySelector('link[href*="cdn.shopify.com"]')||!!document.querySelector('script[src*="cdn.shopify.com"]')||!!document.querySelector('meta[name="shopify-digital-wallet-support"]'))){let o=t;try{const d=new URL(t,r);d.searchParams.delete("width"),d.searchParams.delete("height"),d.searchParams.delete("crop"),d.searchParams.delete("format"),d.searchParams.delete("pad"),d.searchParams.delete("scale"),o=d.toString()}catch{}const p=/_(\d+x\d*|\d*x\d+|pico|icon|thumb|small|compact|medium|large|grande|1024x1024|2048x2048|master)(@\d+x)?(?=\.[a-zA-Z0-9]+)/i;return p.test(o)&&(o=o.replace(p,"")),{url:o,sourceType:"shopify",isUpgraded:o!==e,qualityTier:"4K Master"}}if(t.includes("titan.co.in")||t.includes("tanishq.co.in")||t.includes("demandware.static")||t.includes("/dw/image/")||t.includes("staticimg.tanishq.co.in"))try{let o=t;if(o.includes("/dw/image/")&&o.includes("/on/demandware.static/")){o=o.replace(/\/dw\/image\/v\d+\/[^/]+\//i,"/");const g=new URL(o,r);return g.search="",{url:g.toString(),sourceType:"tanishq",isUpgraded:!0,qualityTier:"4K Master"}}const p=new URL(t,r);(p.searchParams.has("imwidth")||p.searchParams.has("impolicy"))&&(p.searchParams.set("imwidth","2400"),p.searchParams.set("impolicy","hq")),(p.searchParams.has("sw")||p.searchParams.has("sh"))&&(p.searchParams.set("sw","2400"),p.searchParams.set("sh","2400"),p.searchParams.delete("fit"));const d=p.toString();return{url:d,sourceType:"tanishq",isUpgraded:d!==e,qualityTier:"4K Master"}}catch{}if(t.includes("caratlane.com")||t.includes("bluenile.com")||t.includes("brilliantearth.com"))try{const o=new URL(t,r);o.searchParams.delete("w"),o.searchParams.delete("width"),o.searchParams.delete("h"),o.searchParams.delete("height"),o.searchParams.delete("fit"),o.searchParams.delete("crop"),o.searchParams.delete("auto");const p=o.toString();return{url:p,sourceType:"zoom",isUpgraded:p!==e,qualityTier:"4K Master"}}catch{}if(t.includes("cdninstagram.com")||t.includes("fbcdn.net")||i.includes("instagram.com")){if(s&&s instanceof HTMLImageElement&&s.srcset){const p=this.getBestFromSrcset(s.srcset);p&&(t=p)}let o=t;return o=o.replace(/p(150|240|320|480|640|750)x\1/gi,"p1080x1080"),o=o.replace(/s(150|240|320|480|640|750)x\1/gi,"s1080x1080"),o=o.replace(/c\d+\.\d+\.\d+\.\d+[a-z]?_/gi,""),o=o.replace(/\/s(150|240|320|480|640|750)x\1\//gi,"/s1080x1080/"),o=o.replace(/\/p(150|240|320|480|640|750)x\1\//gi,"/p1080x1080/"),{url:o,sourceType:"instagram",isUpgraded:o!==e,qualityTier:"1080p Master"}}if(t.includes("/is/image/")||t.includes("scene7.com"))try{const o=new URL(t,r);return o.searchParams.delete("wid"),o.searchParams.delete("hei"),o.searchParams.delete("fit"),o.searchParams.set("qlt","100"),o.searchParams.set("resMode","sharp2"),{url:o.toString(),sourceType:"scene7",isUpgraded:!0,qualityTier:"4K Master"}}catch{}const l=/\/(full|\d+,\d*|,\d+)\/(\d+|\^?\d+,\d*|pct:\d+)\/(\d+)\/(default\.[a-z]+)$/i;if(l.test(t))return{url:t.replace(l,"/full/max/0/$4"),sourceType:"zoom",isUpgraded:!0,qualityTier:"4K Master"};if(t.includes("amazon.com")||t.includes("media-amazon.com")){const o=/\._[A-Z0-9,_\-]+_\.([a-zA-Z0-9]+)$/i;if(o.test(t))return{url:t.replace(o,".$1"),sourceType:"amazon",isUpgraded:!0,qualityTier:"Ultra HD"}}const c=/-\d+x\d+\.(jpe?g|png|webp|avif)$/i;if(c.test(t))return{url:t.replace(c,".$1"),sourceType:"woocommerce",isUpgraded:!0,qualityTier:"Ultra HD"};if(t.includes("cloudinary.com")&&t.includes("/upload/")){const o=t.replace(/\/upload\/(?:[a-zA-Z0-9_,]+)\//,"/upload/q_100/");if(o!==t)return{url:o,sourceType:"cloudinary",isUpgraded:!0,qualityTier:"Ultra HD"}}if(t.includes("imgix.net")||t.includes("images.unsplash.com"))try{const o=new URL(t,r);return o.searchParams.delete("w"),o.searchParams.delete("h"),o.searchParams.delete("fit"),o.searchParams.delete("crop"),o.searchParams.set("q","100"),{url:o.toString(),sourceType:"imgix",isUpgraded:!0,qualityTier:"Ultra HD"}}catch{}return{url:t,sourceType:"standard",isUpgraded:!1,qualityTier:"High Res"}}static inspectElementZoomAttributes(e){for(const t of this.ZOOM_ATTRIBUTES){const i=e.getAttribute(t);if(i&&i.trim().length>5&&!i.startsWith("data:"))return this.resolveAbsoluteUrl(i.trim())}const s=e.closest("a");if(s&&s.href){const t=s.href.trim();if(/\.(jpe?g|png|webp|avif|mp4|webm)(\?.*)?$/i.test(t))return t;for(const i of this.ZOOM_ATTRIBUTES){const r=s.getAttribute(i);if(r&&r.trim().length>5&&!r.startsWith("data:"))return this.resolveAbsoluteUrl(r.trim())}}return null}static getBestFromSrcset(e){if(!e||typeof e!="string")return null;const s=e.split(",").map(r=>r.trim()).filter(Boolean);let t=null,i=0;for(const r of s){const n=r.split(/\s+/),l=n[0],c=n[1]||"";let o=1;c.endsWith("w")?o=parseInt(c.slice(0,-1),10)||1:c.endsWith("x")&&(o=parseFloat(c.slice(0,-1))*1e3||1),o>i&&(i=o,t=l)}return t}static resolveAbsoluteUrl(e){try{const s=typeof window<"u"&&window.location?window.location.href:"http://localhost";return new URL(e,s).href}catch{return e}}static getSafeFilename(e,s,t){let i="";if(t&&t.trim().length>2&&(i=t.trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"_").replace(/_+/g,"_").replace(/^_|_$/g,"").slice(0,45)),!i)try{const c=typeof window<"u"&&window.location?window.location.href:"http://localhost";i=(new URL(e,c).pathname.split("/").pop()||"").replace(/\.[^/.]+$/,"").replace(/[^a-z0-9_-]+/gi,"_").slice(0,40)}catch{i="jewelry_piece"}(!i||i.length<2)&&(i="jewelry_piece");let r="jpg";const n=e.match(/\.(jpe?g|png|webp|avif|mp4|webm|gif)(\?.*)?$/i);n&&n[1]&&(r=n[1].toLowerCase(),r==="jpeg"&&(r="jpg"));const l=String(s+1).padStart(3,"0");return`${i}_${l}.${r}`}}f(x,"ZOOM_ATTRIBUTES",["data-zoom-image","data-zoom","data-large-img","data-large","data-original","data-src-zoom","data-highres","data-master","data-full-img","data-full","data-orig-file","data-super-large","data-desktop-src","data-splide-lazy","data-lazy-src","data-src"]);const k=["logo","favicon","avatar","profile","payment","visa","mastercard","maestro","paypal","amex","american-express","applepay","apple-pay","googlepay","google-pay","klarna","afterpay","sezzle","trustpilot","secure-checkout","ssl","star-","review-star","icon-","-icon","arrow-","-arrow","chevron","caret","search-","cart-","bag-","basket","close-","menu-","hamburger","divider","spacer","spinner","loader","blank.gif","pixel.gif","1x1","tracking","analytics","social-","facebook","twitter","pinterest-pin","youtube","tiktok","whatsapp-icon"],S={minWidth:80,minHeight:80,ignoreLogos:!0,ignoreSvg:!0};function H(a,e,s=S){if(!e)return!1;try{const t=e.toLowerCase();if(typeof window<"u"&&window.location&&window.location.hostname.includes("instagram.com")){if(t.includes("/t51.2885-19/")||t.includes("s150x150")||t.includes("p150x150")||t.includes("150_n.jpg")||t.includes("150_n.png")||t.includes("44_n.jpg")||t.includes("44_n.png")||t.includes("_a6hd"))return!1;const d=(a.getAttribute("alt")||"").toLowerCase();if(d.includes("profile picture")||d.includes("profile photo")||d.includes("avatar")||a.closest("header")||a.closest("ul._a9ym")||a.closest("div._a9zs")||a.closest('div[role="listitem"]')||a.closest("form"))return!1;const g=a.getBoundingClientRect();if(g.width>0&&g.width<180||g.height>0&&g.height<180)return!1}if(s.ignoreSvg&&(t.endsWith(".svg")||t.includes(".svg?")||t.startsWith("data:image/svg"))||t.startsWith("data:")&&t.length<2e3)return!1;let r=a.offsetWidth||0,n=a.offsetHeight||0;if(r===0||n===0){const d=a.getBoundingClientRect();r=d.width||0,n=d.height||0}let l=0,c=0;a instanceof HTMLImageElement&&(l=a.naturalWidth||0,c=a.naturalHeight||0);const o=Math.max(r,l),p=Math.max(n,c);if(o>0&&p>0){if(o<s.minWidth&&p<s.minHeight)return!1;const d=o/p;if(d>8||d<.12)return!1}if(s.ignoreLogos){let d=t;try{d=new URL(t,window.location.href).pathname}catch{}if(d.includes("/logo.")||d.includes("/logo_")||d.includes("/logos/")||d.includes("favicon")||d.includes("/brand-logo")||d.includes("/payment")||d.includes("/visa.")||d.includes("/mastercard.")||d.includes("/paypal.")||d.includes("/apple-pay")||d.includes("blank.gif")||d.includes("pixel.gif")||d.includes("/1x1."))return!1;if(!(o>=100&&p>=100||o*p>=14e3||o===0&&p===0)){const u=(a.getAttribute("alt")||"").toLowerCase();for(const b of k)if(d.includes(b)||u.includes(b)){if(b.includes("star")&&(u.includes("star sapphire")||u.includes("star ruby")||u.includes("star diamond")))continue;return!1}}}return!0}catch{return!0}}let P=0;function j(a){const e=typeof window<"u"&&window.location.hostname.includes("instagram.com"),s=Array.from(document.querySelectorAll("video"));for(const t of s)B(t,a,e);V(a)}function B(a,e,s){var g;let t="";const i=a.videoWidth||1080,r=a.videoHeight||(s?1920:1080);let n=a.poster||"";if(a.src&&a.src.startsWith("http")&&!a.src.startsWith("blob:")&&(t=a.src),!t){const u=Array.from(a.querySelectorAll("source"));for(const b of u){const y=b.src||b.getAttribute("data-src");if(y&&y.startsWith("http")&&!y.startsWith("blob:")){t=y;break}}}if(!t){const u=a.getAttribute("data-src")||a.getAttribute("data-video-url")||a.getAttribute("data-mp4")||a.getAttribute("data-webm")||a.getAttribute("data-orig-src");u&&u.startsWith("http")&&!u.startsWith("blob:")&&(t=u)}if(s&&(!t||t.startsWith("blob:"))){const u=U(a);if(u&&(t=u),!t){const b=a.closest("article")||a.closest('div[role="dialog"]');if(b){const y=U(b);y&&(t=y)}}}if(!t||t.startsWith("blob:"))return;const l=x.resolveAbsoluteUrl(t);if(e.has(l))return;if(!n){const u=(g=a.parentElement)==null?void 0:g.querySelector("img");u&&u.src&&(n=u.src)}const c=`diamond-video-${++P}`,o=typeof window<"u"?window.location.hostname.replace("www.","").split(".")[0]:"video",p=l.includes(".webm")?"webm":"mp4",d=`${o}_video_1080p_${String(P).padStart(3,"0")}.${p}`;e.set(l,{id:c,originalSrc:l,masterSrc:l,width:i,height:r,naturalWidth:i,naturalHeight:r,sourceType:s?"instagram":o.includes("shopify")?"shopify":o.includes("etsy")?"etsy":o.includes("tanishq")||o.includes("titan")?"tanishq":"standard",qualityLabel:s?"Reel 1080p":"HD Video",selected:!1,altText:s?"Instagram Master Reel Video":"Product Showcase Video",filename:d,element:a,mediaType:"video",videoPoster:n})}function U(a){try{const e=Object.keys(a),s=e.find(i=>i.startsWith("__reactFiber$")||i.startsWith("__reactInternalInstance$")),t=e.find(i=>i.startsWith("__reactProps$"));if(t){const i=a[t],r=D(i);if(r)return r}if(s){let i=a[s],r=0;for(;i&&r<12;){if(i.memoizedProps){const n=D(i.memoizedProps);if(n)return n}if(i.pendingProps){const n=D(i.pendingProps);if(n)return n}i=i.return,r++}}}catch{}return null}function D(a){var e;if(!a||typeof a!="object")return null;if(Array.isArray(a.video_versions)&&a.video_versions.length>0){const s=[...a.video_versions].sort((t,i)=>(i.width||0)*(i.height||0)-(t.width||0)*(t.height||0));if((e=s[0])!=null&&e.url)return s[0].url}if(typeof a.videoUrl=="string"&&a.videoUrl.startsWith("http"))return a.videoUrl;if(typeof a.playbackUrl=="string"&&a.playbackUrl.startsWith("http"))return a.playbackUrl;if(Array.isArray(a.carousel_media)){for(const s of a.carousel_media)if(Array.isArray(s.video_versions)&&s.video_versions.length>0)return s.video_versions[0].url}return null}function V(a){try{const e=document.querySelectorAll('script[type="application/ld+json"], script[id="__NEXT_DATA__"]');for(let s=0;s<e.length;s++){const t=e[s].textContent;if(!t||!t.includes("contentUrl")&&!t.includes(".mp4")&&!t.includes(".webm"))continue;const i=t.match(/https?:\/\/[^\s"'<>\\]+?\.(?:mp4|webm)[^\s"'<>\\]*/gi);if(i)for(let r=0;r<i.length;r++){const n=i[r].replace(/\\u0026/g,"&").replace(/\\/g,"");if(!a.has(n)){const l=`diamond-video-${++P}`,c=typeof window<"u"&&window.location.hostname.includes("instagram.com"),o=n.includes(".webm")?"webm":"mp4";a.set(n,{id:l,originalSrc:n,masterSrc:n,width:1080,height:c?1920:1080,naturalWidth:1080,naturalHeight:c?1920:1080,sourceType:c?"instagram":"standard",qualityLabel:c?"Reel 1080p":"HD Video",selected:!1,altText:c?"Instagram Video Reel":"Website Product Video",filename:`web_video_1080p_${String(P).padStart(3,"0")}.${o}`,mediaType:"video"})}}}}catch{}}let T=0;function N(a){if(typeof window>"u"||!window.location.hostname.includes("instagram.com"))return;const e=Array.from(document.querySelectorAll('div[role="dialog"], div[aria-modal="true"]')).find(t=>t.querySelector("video, div._aagv, div._aagu, article"));if(e){F(e,a);return}let s=Array.from(document.querySelectorAll("article"));s.length===0&&(s=Array.from(document.querySelectorAll('div[data-pressable-container="true"], div._aa61, main[role="main"] section')));for(const t of s)t.closest('div[role="dialog"]')||t.closest('div[aria-modal="true"]')||F(t,a)}function F(a,e,s){var p,d,g,u,b,y,E;const t=a.__dm_processed_id;if(t&&e.has(t))return;const i=W(a);if(i&&Array.isArray(i.carousel_media)&&i.carousel_media.length>1){const m=[];for(let w=0;w<i.carousel_media.length;w++){const v=i.carousel_media[w];let $="",A="image";if(Array.isArray(v.video_versions)&&v.video_versions.length>0?(A="video",$=((p=[...v.video_versions].sort((_,L)=>(L.width||0)*(L.height||0)-(_.width||0)*(_.height||0))[0])==null?void 0:p.url)||""):v.image_versions2&&Array.isArray(v.image_versions2.candidates)&&(A="image",$=((d=[...v.image_versions2.candidates].sort((_,L)=>(L.width||0)*(L.height||0)-(_.width||0)*(_.height||0))[0])==null?void 0:d.url)||""),$){const q=A==="video"?"mp4":"jpg";m.push({url:$,mediaType:A,filename:`instagram_carousel_slide_${w+1}.${q}`,width:1080,height:1080})}}if(m.length>0){const w=m[0],v=C(a)||a,$=`insta-carousel-${++T}`;a.__dm_processed_id=w.url,e.set(w.url,{id:$,originalSrc:w.url,masterSrc:w.url,width:1080,height:1080,naturalWidth:1080,naturalHeight:1080,sourceType:"instagram",qualityLabel:`Carousel (${m.length})`,selected:!1,altText:`Instagram Carousel Post (${m.length} items)`,filename:`instagram_post_carousel_${T}.${w.mediaType==="video"?"mp4":"jpg"}`,element:v,mediaType:w.mediaType,videoPoster:(g=m.find(A=>A.mediaType==="image"))==null?void 0:g.url,carouselItems:m});return}}const r=a.querySelector("video");let n="",l="";if(i&&Array.isArray(i.video_versions)&&i.video_versions.length>0&&(n=((u=[...i.video_versions].sort((w,v)=>(v.width||0)*(v.height||0)-(w.width||0)*(w.height||0))[0])==null?void 0:u.url)||"",i.image_versions2&&Array.isArray(i.image_versions2.candidates)&&(l=((b=i.image_versions2.candidates[0])==null?void 0:b.url)||"")),!n&&r)if(r.src&&!r.src.startsWith("blob:"))n=r.src;else{const m=r.querySelector("source");m&&m.src&&!m.src.startsWith("blob:")?n=m.src:n=R(r)||(r.parentElement?R(r.parentElement):null)||""}if(r&&!l&&(l=r.poster||"",!l)){const m=a.querySelector("div._aagv img, img._aamu");m&&m.src&&(l=x.upgrade(m.src).url)}if(n&&!n.startsWith("blob:")){const m=(r==null?void 0:r.parentElement)||C(a)||a,w=`insta-reel-${++T}`;a.__dm_processed_id=n,e.set(n,{id:w,originalSrc:n,masterSrc:n,width:(r==null?void 0:r.videoWidth)||1080,height:(r==null?void 0:r.videoHeight)||1920,naturalWidth:1080,naturalHeight:1920,sourceType:"instagram",qualityLabel:"Reel 1080p",selected:!1,altText:"Instagram 1080p Reel Video",filename:`instagram_reel_1080p_${T}.mp4`,element:m,mediaType:"video",videoPoster:l,isReel:!0});return}let c="";i&&i.image_versions2&&Array.isArray(i.image_versions2.candidates)&&(c=((y=i.image_versions2.candidates[0])==null?void 0:y.url)||"");const o=a.querySelector("div._aagv img, div._aagu img");if(!c&&o&&o.src&&!((E=o.alt)!=null&&E.toLowerCase().includes("profile picture"))&&!o.src.includes("/t51.2885-19/")&&(c=x.upgrade(o.src,o).url),c&&!c.includes("/t51.2885-19/")){const m=(o==null?void 0:o.parentElement)||C(a)||a,w=`insta-photo-${++T}`;a.__dm_processed_id=c,e.set(c,{id:w,originalSrc:c,masterSrc:c,width:1080,height:1350,naturalWidth:1080,naturalHeight:1350,sourceType:"instagram",qualityLabel:"Photo 1080p",selected:!1,altText:"Instagram Master Photo",filename:`instagram_photo_1080p_${T}.jpg`,element:m,mediaType:"image"})}}function C(a){const e=a.querySelector('div._aagv, div._aagu, div._ab1b, div[role="button"]:has(video), div[role="button"]:has(img)');if(e)return e;const s=a.querySelector("video");if(s&&s.parentElement)return s.parentElement;const t=a.querySelector('img:not([alt*="profile picture"])');return t&&t.parentElement?t.parentElement:null}function W(a){try{const e=Object.keys(a),s=e.find(i=>i.startsWith("__reactFiber$")||i.startsWith("__reactInternalInstance$")),t=e.find(i=>i.startsWith("__reactProps$"));if(t){const i=a[t],r=I(i);if(r)return r}if(s){let i=a[s],r=0;for(;i&&r<16;){if(i.memoizedProps){const n=I(i.memoizedProps);if(n)return n}if(i.pendingProps){const n=I(i.pendingProps);if(n)return n}i=i.return,r++}}}catch{}return null}function I(a){if(!a||typeof a!="object")return null;if(a.post&&typeof a.post=="object")return a.post;if(a.item&&typeof a.item=="object")return a.item;if(a.media&&typeof a.media=="object")return a.media;if(a.clip&&typeof a.clip=="object")return a.clip;if(a.video&&typeof a.video=="object")return a.video;if(Array.isArray(a.video_versions)||Array.isArray(a.carousel_media))return a;if(a.children&&typeof a.children=="object"&&a.children.props){const e=I(a.children.props);if(e)return e}return null}function R(a){var s;const e=W(a);return e&&Array.isArray(e.video_versions)&&e.video_versions.length>0&&((s=[...e.video_versions].sort((i,r)=>(r.width||0)*(r.height||0)-(i.width||0)*(i.height||0))[0])==null?void 0:s.url)||null}let M=0;function Z(a){const e=new Map;if(typeof window<"u"&&window.location&&window.location.hostname.includes("instagram.com"))return N(e),Array.from(e.values());const t={minWidth:a.minSize||80,minHeight:a.minSize||80,ignoreLogos:!0,ignoreSvg:!0},i=z("img");for(let l=0;l<i.length;l++)G(i[l],t,e);const r=z("picture source, source[srcset]");for(let l=0;l<r.length;l++)Y(r[l],t,e);const n=z('[style*="background"], [style*="url("], [class*="bg-"], [class*="hero"], [class*="gallery"], [class*="slide"], [class*="banner"]');for(let l=0;l<n.length;l++)K(n[l],t,e);return j(e),X(t,e),Array.from(e.values())}function z(a){const e=Array.from(document.querySelectorAll(a)),s=document.querySelectorAll("*");for(let t=0;t<s.length;t++){const i=s[t].shadowRoot;if(i&&s[t].id!=="diamond-clarity-root")try{const r=i.querySelectorAll(a);for(let n=0;n<r.length;n++)e.push(r[n])}catch{}}return e}function G(a,e,s){let t="";const i=a.getAttribute("data-zoom-image")||a.getAttribute("data-zoom")||a.getAttribute("data-large-img")||a.getAttribute("data-large")||a.getAttribute("data-highres")||a.getAttribute("data-hi-res-src")||a.getAttribute("data-master")||a.getAttribute("data-super-large")||a.getAttribute("data-full-img")||a.getAttribute("data-full-src")||a.getAttribute("data-original")||a.getAttribute("data-original-src");if(i&&!i.startsWith("data:")&&(t=i),!t&&a.srcset&&(t=x.getBestFromSrcset(a.srcset)||""),!t||t.startsWith("data:")){const m=a.getAttribute("data-src-zoom")||a.getAttribute("data-desktop-src")||a.getAttribute("data-splide-lazy")||a.getAttribute("data-lazy-src")||a.getAttribute("data-lazy")||a.getAttribute("data-src")||a.getAttribute("data-image-src")||a.getAttribute("data-img-src")||a.getAttribute("data-srcset");m&&(m.includes(" ")&&m.includes(",")?t=x.getBestFromSrcset(m)||m:t=m)}if((!t||t.startsWith("data:"))&&a.currentSrc&&!a.currentSrc.startsWith("data:")&&(t=a.currentSrc),(!t||t.startsWith("data:"))&&a.src&&!a.src.startsWith("data:")&&(t=a.src),!t||t.startsWith("data:image/svg"))return;const r=x.resolveAbsoluteUrl(t);if(!H(a,r,e))return;const n=x.upgrade(r,a),l=n.url;if(!l||s.has(l))return;const c=a.offsetWidth||a.getBoundingClientRect().width||0,o=a.offsetHeight||a.getBoundingClientRect().height||0,p=a.naturalWidth||c||0,d=a.naturalHeight||o||0,g=Math.max(c,p,d);let u=n.qualityTier;n.sourceType==="tanishq"?u="Tanishq 4K":g>=2400?u="4K Master":g>=1800?u="Ultra HD":g>=1080?u="1080p Master":g>=600&&(u="High Res");const b=a.getAttribute("alt")||"",y=`diamond-img-${++M}`,E=x.getSafeFilename(l,s.size,b);s.set(l,{id:y,originalSrc:r,masterSrc:l,width:Math.round(c)||400,height:Math.round(o)||400,naturalWidth:p||1200,naturalHeight:d||1200,sourceType:n.sourceType,qualityLabel:u,selected:!1,altText:b,filename:E,element:a,mediaType:"image"})}function Y(a,e,s){const t=a.srcset||a.getAttribute("data-srcset");if(!t)return;const i=x.getBestFromSrcset(t);if(!i||i.startsWith("data:image/svg"))return;const r=x.resolveAbsoluteUrl(i),n=x.upgrade(r,a),l=n.url;if(!l||s.has(l))return;const c=a.closest("picture"),o=c==null?void 0:c.querySelector("img"),p=(o==null?void 0:o.getAttribute("alt"))||"",d=`diamond-img-${++M}`,g=x.getSafeFilename(l,s.size,p);s.set(l,{id:d,originalSrc:r,masterSrc:l,width:(o==null?void 0:o.offsetWidth)||800,height:(o==null?void 0:o.offsetHeight)||800,naturalWidth:(o==null?void 0:o.naturalWidth)||1600,naturalHeight:(o==null?void 0:o.naturalHeight)||1600,sourceType:n.sourceType,qualityLabel:"Ultra HD",selected:!1,altText:p,filename:g,element:o||c,mediaType:"image"})}function K(a,e,s){const t=window.getComputedStyle(a).backgroundImage;if(!t||t==="none"||!t.startsWith("url("))return;const i=t.match(/url\(['"]?(.*?)['"]?\)/i);if(!i||!i[1])return;const r=i[1];if(r.startsWith("data:")||r.endsWith(".svg"))return;const n=x.resolveAbsoluteUrl(r);if(!H(a,n,e))return;const l=x.upgrade(n,a),c=l.url;if(!c||s.has(c))return;const o=a.getBoundingClientRect(),p=Math.round(o.width)||600,d=Math.round(o.height)||600,g=`diamond-img-${++M}`,u=x.getSafeFilename(c,s.size,a.title||a.getAttribute("aria-label")||"");s.set(c,{id:g,originalSrc:n,masterSrc:c,width:p,height:d,naturalWidth:p,naturalHeight:d,sourceType:l.sourceType,qualityLabel:p>=1500?"Ultra HD":"High Res",selected:!1,altText:a.title||a.getAttribute("aria-label")||"",filename:u,element:a,mediaType:"image"})}function X(a,e){try{const s=document.querySelectorAll('script[id="__NEXT_DATA__"], script[type="application/ld+json"], script[data-product-json]');for(let t=0;t<s.length;t++){const i=s[t].textContent;if(!i||i.length<50)continue;const r=i.match(/https?:\/\/[^\s"'<>\\]+?\.(?:jpe?g|png|webp|avif)/gi);if(r)for(let n=0;n<r.length;n++){const l=r[n].replace(/\\/g,"");if(l.includes("logo")||l.includes("icon")||l.includes("avatar"))continue;const c=x.upgrade(l),o=c.url;if(o&&!e.has(o)){const p=`diamond-img-${++M}`,d=x.getSafeFilename(o,e.size,"jewelry_piece");e.set(o,{id:p,originalSrc:l,masterSrc:o,width:1200,height:1200,naturalWidth:2400,naturalHeight:2400,sourceType:c.sourceType,qualityLabel:"4K Master",selected:!1,altText:"Catalog Master Image",filename:d,mediaType:"image"})}}}}catch{}}const Q=`
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
`,J=`
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
`,h={diamond:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 3h12l4 6-10 12L2 9z"></path>
      <path d="M11 3v6"></path>
      <path d="M13 3v6"></path>
      <path d="M2 9h20"></path>
      <path d="M10 21l-3-12"></path>
      <path d="M14 21l3-12"></path>
    </svg>
  `,video:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 2v20"></path>
      <path d="M8 2v20"></path>
      <path d="M2 12h20"></path>
      <path d="M2 7h6"></path>
      <path d="M2 17h6"></path>
      <path d="M16 17h6"></path>
      <path d="M16 7h6"></path>
    </svg>
  `,film:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
      <line x1="7" y1="2" x2="7" y2="22"></line>
      <line x1="17" y1="2" x2="17" y2="22"></line>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <line x1="2" y1="7" x2="7" y2="7"></line>
      <line x1="2" y1="17" x2="7" y2="17"></line>
      <line x1="17" y1="17" x2="22" y2="17"></line>
      <line x1="17" y1="7" x2="22" y2="7"></line>
    </svg>
  `,photo:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,play:(a=16)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6 3 20 12 6 21 6 3"></polygon>
    </svg>
  `,download:(a=16,e=2.2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,check:(a=16,e=2.4)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `,close:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `,search:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,zoom:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
  `,zip:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
      <path d="m3.3 7 8.7 5 8.7-5"></path>
      <path d="M12 22V12"></path>
    </svg>
  `,copy:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  `,power:(a=14,e=2.2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
      <line x1="12" y1="2" x2="12" y2="12"></line>
    </svg>
  `,sparkles:(a=16,e=2)=>`
    <svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>
    </svg>
  `,spinner:(a=16)=>`
    <svg class="dm-spin" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
    </svg>
  `};class ee{constructor(e,s,t){f(this,"shadowRoot");f(this,"overlaysContainer");f(this,"badgesMap",new Map);f(this,"onToggleSelect");f(this,"onDownloadSingle");this.shadowRoot=e,this.onToggleSelect=s,this.onDownloadSingle=t,this.overlaysContainer=document.createElement("div"),this.overlaysContainer.className="diamond-overlays-container",this.shadowRoot.appendChild(this.overlaysContainer),window.addEventListener("scroll",()=>this.updatePositions(),{passive:!0}),window.addEventListener("resize",()=>this.updatePositions(),{passive:!0})}renderBadges(e,s){if(this.overlaysContainer.innerHTML="",this.badgesMap.clear(),!!s)for(const t of e)try{if(!t.element)continue;const i=t.element.getBoundingClientRect();if(i.width===0||i.height===0)continue;const r=this.createBadgeElement(t);this.overlaysContainer.appendChild(r),this.badgesMap.set(t.id,r),this.positionBadge(r,t.element),this.updateElementSelectionVisual(t)}catch{}}createBadgeElement(e){const s=document.createElement("div");s.className=`diamond-badge ${e.selected?"is-selected":""}`,s.dataset.imageId=e.id;const t=e.mediaType==="video",i=Array.isArray(e.carouselItems)&&e.carouselItems.length>1;let r="MASTER 4K",n="master";t?e.sourceType==="instagram"?(r="REEL 1080P",n="insta"):(r="HD VIDEO",n="master"):i?(r=`CAROUSEL (${e.carouselItems.length})`,n="insta"):e.sourceType==="etsy"?(r="ETSY 4K",n="etsy"):e.sourceType==="shopify"?(r="SHOPIFY RAW",n="shopify"):e.sourceType==="tanishq"?(r="TANISHQ 4K",n="tanishq"):e.sourceType==="instagram"?(r="PHOTO 1080P",n="insta"):e.sourceType==="scene7"&&(r="STUDIO MASTER",n="master");const l=e.naturalWidth&&e.naturalHeight?`${e.naturalWidth}×${e.naturalHeight}`:`${e.width}×${e.height}`;if(t){const y=e.sourceType==="instagram"?"Download Reel":"Download Video";s.innerHTML=`
        <div class="diamond-badge-inner">
          <label class="diamond-checkbox-label" title="Select item">
            <input type="checkbox" class="diamond-checkbox" ${e.selected?"checked":""} />
            <span class="diamond-checkmark"></span>
          </label>
          
          <div class="diamond-badge-info">
            <span class="diamond-tag ${n}">${r}</span>
          </div>

          <div class="dm-direct-actions">
            <button class="dm-direct-action-btn dm-btn-primary btn-dl-video" title="Download Master 1080p Video">
              ${h.download(13)}
              <span>${y}</span>
            </button>

            ${e.videoPoster?`
              <button class="dm-direct-action-btn dm-btn-secondary btn-dl-cover" title="Download High-Res Cover Thumbnail">
                ${h.photo(13)}
                <span>Cover</span>
              </button>
            `:""}

            <button class="dm-direct-action-btn dm-btn-icon btn-preview" title="View Full Video">
              ${h.zoom(13)}
            </button>
          </div>
        </div>
      `}else i?s.innerHTML=`
        <div class="diamond-badge-inner">
          <label class="diamond-checkbox-label" title="Select item">
            <input type="checkbox" class="diamond-checkbox" ${e.selected?"checked":""} />
            <span class="diamond-checkmark"></span>
          </label>
          
          <div class="diamond-badge-info">
            <span class="diamond-tag ${n}">${r}</span>
          </div>

          <div class="dm-direct-actions">
            <button class="dm-direct-action-btn dm-btn-primary btn-dl-carousel-all" title="Download All ${e.carouselItems.length} Photos in Post as ZIP">
              ${h.zip(13)}
              <span>Download All (${e.carouselItems.length}) ZIP</span>
            </button>

            <button class="dm-direct-action-btn dm-btn-secondary btn-dl-photo" title="Download Current Photo">
              ${h.download(13)}
              <span>Photo</span>
            </button>

            <button class="dm-direct-action-btn dm-btn-icon btn-preview" title="View Full Photo">
              ${h.zoom(13)}
            </button>
          </div>
        </div>
      `:s.innerHTML=`
        <div class="diamond-badge-inner">
          <label class="diamond-checkbox-label" title="Select photo">
            <input type="checkbox" class="diamond-checkbox" ${e.selected?"checked":""} />
            <span class="diamond-checkmark"></span>
          </label>
          
          <div class="diamond-badge-info">
            <span class="diamond-tag ${n}">${r}</span>
            <span class="diamond-res">${l}</span>
          </div>

          <div class="dm-direct-actions">
            <button class="dm-direct-action-btn dm-btn-primary btn-dl-photo" title="Download Master Photo">
              ${h.download(13)}
              <span>Download Photo</span>
            </button>

            <button class="dm-direct-action-btn dm-btn-icon btn-preview" title="View Full Master">
              ${h.zoom(13)}
            </button>
          </div>
        </div>
      `;const c=s.querySelector(".diamond-checkbox");c&&c.addEventListener("change",b=>{b.stopPropagation(),e.selected=c.checked,s.classList.toggle("is-selected",e.selected),this.updateElementSelectionVisual(e),this.onToggleSelect(e.id,e.selected)});const o=s.querySelector(".btn-preview");o==null||o.addEventListener("click",b=>{b.stopPropagation(),window.open(e.masterSrc,"_blank")});const p=s.querySelector(".btn-dl-video");p==null||p.addEventListener("click",b=>{b.stopPropagation();const E=e.sourceType==="instagram"?"Download Reel":"Download Video";p.innerHTML=`${h.spinner(13)}<span>Downloading...</span>`,this.onDownloadSingle(e),setTimeout(()=>{p.innerHTML=`${h.check(13)}<span>Saved!</span>`,setTimeout(()=>{p.innerHTML=`${h.download(13)}<span>${E}</span>`},1800)},500)});const d=s.querySelector(".btn-dl-cover");d==null||d.addEventListener("click",b=>{if(b.stopPropagation(),!e.videoPoster)return;d.innerHTML=`${h.spinner(13)}<span>Saving...</span>`;const y={...e,masterSrc:e.videoPoster,filename:e.filename.replace(/\.(mp4|webm)$/i,"_cover.jpg"),mediaType:"image"};this.onDownloadSingle(y),setTimeout(()=>{d.innerHTML=`${h.check(13)}<span>Saved!</span>`,setTimeout(()=>{d.innerHTML=`${h.photo(13)}<span>Cover</span>`},1800)},500)});const g=s.querySelector(".btn-dl-carousel-all");g==null||g.addEventListener("click",b=>{b.stopPropagation(),e.carouselItems&&(g.innerHTML=`${h.spinner(13)}<span>Creating ZIP...</span>`,chrome.runtime.sendMessage({type:"DOWNLOAD_BATCH",images:e.carouselItems.map(y=>({url:y.url,filename:y.filename})),asZip:!0,zipFilename:`instagram_carousel_${e.id}.zip`}),setTimeout(()=>{g.innerHTML=`${h.check(13)}<span>ZIP Started!</span>`,setTimeout(()=>{g.innerHTML=`${h.zip(13)}<span>Download All (${e.carouselItems.length}) ZIP</span>`},2e3)},800))});const u=s.querySelector(".btn-dl-photo");return u==null||u.addEventListener("click",b=>{b.stopPropagation(),u.innerHTML=`${h.spinner(13)}<span>Downloading...</span>`,this.onDownloadSingle(e),setTimeout(()=>{u.innerHTML=`${h.check(13)}<span>Saved!</span>`,setTimeout(()=>{u.innerHTML=`${h.download(13)}<span>Download Photo</span>`},1800)},500)}),s.addEventListener("click",b=>{b.target.closest("button")||b.target.closest("input")||c&&(c.checked=!c.checked,e.selected=c.checked,s.classList.toggle("is-selected",e.selected),this.updateElementSelectionVisual(e),this.onToggleSelect(e.id,e.selected))}),s}isElementFixed(e){try{let s=e;for(;s&&s!==document.body&&s!==document.documentElement;){if(s.nodeType===Node.ELEMENT_NODE){const t=window.getComputedStyle(s);if(t&&(t.position==="fixed"||t.position==="sticky")||s.getAttribute&&s.getAttribute("role")==="dialog")return!0}s=s.parentElement}}catch{return!1}return!1}positionBadge(e,s){try{e.__targetEl=s;const t=this.isElementFixed(s),i=s.getBoundingClientRect(),r=window.scrollX||window.pageXOffset||0,n=window.scrollY||window.pageYOffset||0;t?(e.style.position="fixed",e.style.top=`${Math.max(12,i.top+14)}px`,e.style.right=`${Math.max(14,window.innerWidth-i.right+14)}px`,e.style.left="auto"):(e.style.position="absolute",e.style.top=`${Math.max(0,n+i.top+14)}px`,e.style.right=`${Math.max(14,document.documentElement.clientWidth-(r+i.right)+14)}px`,e.style.left="auto")}catch{}}updatePositions(){for(const[e,s]of this.badgesMap.entries()){const t=s.__targetEl;t&&t.isConnected&&this.positionBadge(s,t)}}updateSelectionState(e){for(const s of e){const t=this.badgesMap.get(s.id);if(t){t.classList.toggle("is-selected",s.selected);const i=t.querySelector(".diamond-checkbox");i&&(i.checked=s.selected)}this.updateElementSelectionVisual(s)}}updateElementSelectionVisual(e){e.element&&(e.selected?(e.element.style.outline="2px solid rgba(255, 255, 255, 0.95)",e.element.style.outlineOffset="2px",e.element.style.boxShadow="0 0 16px rgba(255, 255, 255, 0.4)",e.element.style.transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"):(e.element.style.outline="",e.element.style.outlineOffset="",e.element.style.boxShadow=""))}}class te{constructor(e,s){f(this,"shadowRoot");f(this,"containerEl");f(this,"triggerEl");f(this,"backdropEl");f(this,"drawerEl");f(this,"toastEl");f(this,"lightboxEl");f(this,"isOpen",!1);f(this,"activeFilter","all");f(this,"searchQuery","");f(this,"onDownloadSingle");f(this,"onDownloadAllZip");f(this,"onDownloadSelected");f(this,"onSelectAll");f(this,"onDeselectAll");f(this,"onToggleImageSelect");f(this,"onToggleEnabled");f(this,"cachedImages",[]);f(this,"cachedSettings",null);this.shadowRoot=e,this.onDownloadSingle=s.onDownloadSingle,this.onDownloadAllZip=s.onDownloadAllZip,this.onDownloadSelected=s.onDownloadSelected,this.onSelectAll=s.onSelectAll,this.onDeselectAll=s.onDeselectAll,this.onToggleImageSelect=s.onToggleImageSelect,this.onToggleEnabled=s.onToggleEnabled,this.containerEl=document.createElement("div"),this.containerEl.className="diamond-side-root",this.triggerEl=document.createElement("div"),this.triggerEl.className="diamond-side-trigger",this.triggerEl.innerHTML=`
      <div class="trigger-icon">${h.diamond(18)}</div>
      <div class="trigger-text">
        <span class="trigger-title">Media</span>
        <span class="trigger-count">0 items</span>
      </div>
    `,this.triggerEl.addEventListener("click",()=>this.toggleOpen()),this.backdropEl=document.createElement("div"),this.backdropEl.className="diamond-side-backdrop",this.backdropEl.addEventListener("click",i=>{i.target===this.backdropEl&&this.close()}),this.drawerEl=document.createElement("div"),this.drawerEl.className="diamond-side-panel",this.drawerEl.addEventListener("click",i=>{i.stopPropagation()}),this.toastEl=document.createElement("div"),this.toastEl.className="diamond-toast",this.toastEl.innerHTML=`<span class="toast-icon">${h.check(14)}</span><span class="toast-text"></span>`,this.lightboxEl=document.createElement("div"),this.lightboxEl.className="diamond-lightbox",this.lightboxEl.innerHTML=`
      <button class="lightbox-close-btn" title="Close preview">${h.close(18)}</button>
      <div class="lightbox-image-wrap">
        <div class="lightbox-media-container"></div>
        <div class="lightbox-details">
          <span class="lightbox-res"></span>
          <span class="lightbox-src"></span>
          <button class="btn-monochrome-secondary btn-lightbox-download">
            ${h.download(14)} Download Master
          </button>
        </div>
      </div>
    `;const t=this.lightboxEl.querySelector(".lightbox-close-btn");t==null||t.addEventListener("click",()=>this.closeLightbox()),this.lightboxEl.addEventListener("click",i=>{i.target===this.lightboxEl&&this.closeLightbox()}),this.containerEl.appendChild(this.triggerEl),this.containerEl.appendChild(this.backdropEl),this.containerEl.appendChild(this.drawerEl),this.containerEl.appendChild(this.toastEl),this.containerEl.appendChild(this.lightboxEl),this.shadowRoot.appendChild(this.containerEl),window.addEventListener("keydown",i=>{i.altKey&&(i.key==="d"||i.key==="D")?this.toggleOpen():i.key==="Escape"&&(this.lightboxEl.classList.contains("open")?this.closeLightbox():this.isOpen&&this.close())})}update(e,s){if(this.cachedImages=e,this.cachedSettings=s,s.enabled)this.triggerEl.style.display="flex";else{this.triggerEl.style.display="none",this.isOpen&&this.close();return}const t=e.length,i=e.filter(n=>n.selected).length,r=this.triggerEl.querySelector(".trigger-count");r&&(r.textContent=i>0?`${i}/${t} selected`:`${t} items`),this.isOpen&&this.refreshDrawerContent()}refreshDrawerContent(){var n;if(!this.cachedImages||!this.cachedSettings)return;const e=this.cachedImages.length,s=this.cachedImages.filter(l=>l.selected).length,t=this.cachedImages.filter(l=>{if(this.activeFilter==="video"){if(l.mediaType!=="video")return!1}else if(this.activeFilter==="4k"){if(Math.max(l.naturalWidth||l.width,l.naturalHeight||l.height)<1800)return!1}else if(this.activeFilter==="hd"){if(Math.max(l.naturalWidth||l.width,l.naturalHeight||l.height)<1e3)return!1}else{if(this.activeFilter==="etsy"&&l.sourceType!=="etsy")return!1;if(this.activeFilter==="instagram"&&l.sourceType!=="instagram")return!1;if(this.activeFilter==="shopify"&&l.sourceType!=="shopify")return!1;if(this.activeFilter==="tanishq"&&l.sourceType!=="tanishq")return!1}if(this.searchQuery.trim().length>0){const c=this.searchQuery.toLowerCase(),o=l.altText.toLowerCase().includes(c),p=l.filename.toLowerCase().includes(c),d=l.sourceType.toLowerCase().includes(c);if(!o&&!p&&!d)return!1}return!0}),i=((n=this.drawerEl.querySelector(".panel-grid-container"))==null?void 0:n.scrollTop)||0;this.renderDrawer(t,e,s,this.cachedSettings);const r=this.drawerEl.querySelector(".panel-grid-container");r&&i>0&&(r.scrollTop=i)}renderDrawer(e,s,t,i){const r=this.cachedImages.filter(l=>l.mediaType==="video").length;this.drawerEl.innerHTML=`
      <!-- Apple Glass Header -->
      <header class="panel-header">
        <div class="header-left">
          <div class="header-logo-gem">${h.diamond(18)}</div>
          <div class="header-title-block">
            <span class="header-title">Diamond Master</span>
            <span class="header-meta">${s} Master Assets Found</span>
          </div>
        </div>
        <div class="header-right">
          <button class="panel-power-btn ${i.enabled?"":"off"}" title="Turn Extension ON / OFF">
            <span class="power-dot"></span>
            <span class="power-text">${i.enabled?"ACTIVE":"OFF"}</span>
          </button>
          <button class="panel-close-btn" title="Close Panel (Esc)">${h.close(14)}</button>
        </div>
      </header>

      <!-- Glass Action Controls -->
      <section class="panel-actions-section">
        <!-- 1-Click Master ZIP Download -->
        <button class="btn-monochrome-primary btn-download-zip" title="Package all full-res assets into uncompressed ZIP">
          ${h.zip(16)}
          Download All as ZIP (${s})
        </button>

        <div class="actions-row">
          <button class="btn-monochrome-secondary btn-select-all">${h.check(13)} Select All</button>
          <button class="btn-monochrome-secondary btn-deselect-all">${h.close(13)} Clear</button>
          <button class="btn-monochrome-secondary btn-download-selected" ${t===0?"disabled":""}>
            ${h.download(13)} Selected (${t})
          </button>
        </div>

        <!-- Glass Search Input -->
        <input type="text" class="panel-search-box" placeholder="Filter jewelry by keyword..." value="${this.searchQuery}" />

        <!-- Glass Filter Chips -->
        <div class="filter-bar">
          <button class="filter-chip ${this.activeFilter==="all"?"active":""}" data-filter="all">All (${s})</button>
          ${r>0?`<button class="filter-chip ${this.activeFilter==="video"?"active":""}" data-filter="video">${h.video(12)} Reels (${r})</button>`:""}
          <button class="filter-chip ${this.activeFilter==="4k"?"active":""}" data-filter="4k">${h.sparkles(12)} 4K Master</button>
          <button class="filter-chip ${this.activeFilter==="hd"?"active":""}" data-filter="hd">HD 1080p</button>
          <button class="filter-chip ${this.activeFilter==="tanishq"?"active":""}" data-filter="tanishq">Tanishq</button>
          <button class="filter-chip ${this.activeFilter==="instagram"?"active":""}" data-filter="instagram">Instagram</button>
          <button class="filter-chip ${this.activeFilter==="etsy"?"active":""}" data-filter="etsy">Etsy</button>
          <button class="filter-chip ${this.activeFilter==="shopify"?"active":""}" data-filter="shopify">Shopify</button>
        </div>
      </section>

      <!-- Media Grid -->
      <main class="panel-grid-container">
        <div class="panel-grid">
          ${e.length===0?`
              <div class="panel-empty-state">
                <div class="empty-gem">${h.diamond(36)}</div>
                <p>No media matches the selected filter.</p>
              </div>
            `:""}
        </div>
      </main>

      <!-- Glass Footer -->
      <footer class="panel-footer">
        <span class="footer-badge">${h.sparkles(13)} 100% BIT-EXACT MASTER</span>
        <span>Click photo or reel to download</span>
      </footer>
    `;const n=this.drawerEl.querySelector(".panel-grid");if(n&&e.length>0)for(const l of e){const c=this.createCardElement(l);n.appendChild(c)}this.attachDrawerEvents()}createCardElement(e){const s=document.createElement("div");s.className=`panel-image-card ${e.selected?"selected":""}`,s.dataset.imageId=e.id;const t=e.mediaType==="video",i=t?e.sourceType==="instagram"?"REEL":"VIDEO":e.sourceType==="etsy"?"ETSY":e.sourceType==="shopify"?"SHOPIFY":e.sourceType==="tanishq"?"TANISHQ":e.sourceType==="instagram"?"INSTA":e.sourceType==="scene7"?"MASTER":"HD",r=e.naturalWidth&&e.naturalHeight?`${e.naturalWidth}×${e.naturalHeight}${t?" MP4":""}`:`${e.width}×${e.height}${t?" MP4":""}`,n=e.videoPoster||e.masterSrc;s.innerHTML=`
      <img class="panel-image-thumb" src="${n}" alt="${e.altText||"Media piece"}" loading="lazy" />

      ${t?`<div class="card-play-icon">${h.play(18)}</div>`:""}

      <!-- Top Overlay -->
      <div class="card-header-overlay">
        <span class="card-source-tag ${t?"video-tag":""}">${i}</span>
        <div class="card-actions-top">
          <button class="card-copy-btn" title="Copy Direct Master Link">${h.copy(12)}</button>
          <button class="card-zoom-btn" title="${t?"Watch Reel":"Inspect Facets"}">${h.zoom(12)}</button>
          <label class="card-checkbox-label" title="Select for bulk download">
            <input type="checkbox" class="card-checkbox" ${e.selected?"checked":""} />
            <span class="card-checkmark"></span>
          </label>
        </div>
      </div>

      <!-- Bottom Overlay with Explicit Single Download Button -->
      <div class="card-footer-overlay">
        <div class="card-footer-info">
          <span class="card-resolution">${r}</span>
        </div>
        <button class="card-btn-download ${t?"video-dl":""}" title="${t?"Download 1080p Video":"Download Master Photo"}">
          ${h.download(11)}
          <span>${t?"Reel":"Download"}</span>
        </button>
      </div>

      <!-- Download Status -->
      <div class="card-download-status">
        ${h.check(24)}
        <span class="card-status-text">Downloaded</span>
      </div>
    `;const l=s.querySelector(".card-btn-download");l==null||l.addEventListener("click",d=>{d.stopPropagation(),this.triggerInstantDownload(s,e,l)}),s.addEventListener("click",d=>{d.stopPropagation();const g=d.target;g.closest(".card-checkbox-label")||g.closest(".card-zoom-btn")||g.closest(".card-copy-btn")||g.closest(".card-btn-download")||this.triggerInstantDownload(s,e,l)});const c=s.querySelector(".card-zoom-btn");c==null||c.addEventListener("click",d=>{d.stopPropagation(),this.openLightbox(e)});const o=s.querySelector(".card-copy-btn");o==null||o.addEventListener("click",d=>{d.stopPropagation(),navigator.clipboard.writeText(e.masterSrc).then(()=>{this.showToast("Copied Master HD link to clipboard!")})});const p=s.querySelector(".card-checkbox");return p&&p.addEventListener("change",d=>{d.stopPropagation(),e.selected=p.checked,s.classList.toggle("selected",e.selected),this.onToggleImageSelect(e.id,e.selected)}),s}triggerInstantDownload(e,s,t){t&&(t.innerHTML=`${h.spinner(11)}<span>Saving...</span>`,t.style.pointerEvents="none");const i=e.querySelector(".card-download-status");i&&(i.classList.add("active"),setTimeout(()=>{i.classList.remove("active")},1200));const r=s.mediaType==="video",n=r?"Reel Video":"Master Photo",l=r?"Reel":"Download";this.showToast(`Downloading ${n}: ${s.filename}`),this.onDownloadSingle(s),setTimeout(()=>{t&&(t.innerHTML=`${h.check(11)}<span>Saved!</span>`,setTimeout(()=>{t.innerHTML=`${h.download(11)}<span>${l}</span>`,t.style.pointerEvents=""},1600))},500)}showToast(e){const s=this.toastEl.querySelector(".toast-text");s&&(s.textContent=e),this.toastEl.classList.add("show"),setTimeout(()=>{this.toastEl.classList.remove("show")},2400)}openLightbox(e){const s=this.lightboxEl.querySelector(".lightbox-media-container"),t=this.lightboxEl.querySelector(".lightbox-res"),i=this.lightboxEl.querySelector(".lightbox-src"),r=this.lightboxEl.querySelector(".btn-lightbox-download");s&&(e.mediaType==="video"?s.innerHTML=`
          <video controls autoplay class="lightbox-image" src="${e.masterSrc}" poster="${e.videoPoster||""}">
            Your browser does not support HTML5 video.
          </video>
        `:s.innerHTML=`<img class="lightbox-image" src="${e.masterSrc}" alt="High-Res Inspection" />`),t&&(t.textContent=`${e.naturalWidth||e.width} × ${e.naturalHeight||e.height} px`),i&&(i.textContent=`Source: ${e.sourceType.toUpperCase()} ${e.mediaType==="video"?"(REEL)":""}`),r&&(r.onclick=()=>{this.onDownloadSingle(e),this.showToast(`Downloaded: ${e.filename}`)}),this.lightboxEl.classList.add("open")}closeLightbox(){this.lightboxEl.classList.remove("open");const e=this.lightboxEl.querySelector("video");e&&e.pause()}attachDrawerEvents(){const e=this.drawerEl.querySelector(".panel-close-btn");e==null||e.addEventListener("click",()=>this.close());const s=this.drawerEl.querySelector(".panel-power-btn");s==null||s.addEventListener("click",()=>{this.onToggleEnabled()});const t=this.drawerEl.querySelector(".panel-search-box");t==null||t.addEventListener("input",()=>{this.searchQuery=t.value,this.cachedImages&&this.cachedSettings&&this.update(this.cachedImages,this.cachedSettings)});const i=this.drawerEl.querySelector(".btn-download-zip");i==null||i.addEventListener("click",()=>{i.innerHTML=`${h.spinner(15)} Creating ZIP...`,this.showToast("Packaging all master assets into ZIP archive..."),this.onDownloadAllZip(),setTimeout(()=>{i&&(i.innerHTML=`${h.check(15)} ZIP Started!`,setTimeout(()=>{this.cachedImages&&this.cachedSettings&&this.update(this.cachedImages,this.cachedSettings)},1800))},1e3)});const r=this.drawerEl.querySelector(".btn-select-all");r==null||r.addEventListener("click",()=>this.onSelectAll());const n=this.drawerEl.querySelector(".btn-deselect-all");n==null||n.addEventListener("click",()=>this.onDeselectAll());const l=this.drawerEl.querySelector(".btn-download-selected");l==null||l.addEventListener("click",()=>{this.showToast("Downloading selected media items..."),this.onDownloadSelected()}),this.drawerEl.querySelectorAll(".filter-chip").forEach(o=>{o.addEventListener("click",()=>{this.activeFilter=o.dataset.filter||"all",this.cachedImages&&this.cachedSettings&&this.update(this.cachedImages,this.cachedSettings)})})}open(){this.isOpen=!0,this.refreshDrawerContent(),this.drawerEl.classList.add("open"),this.backdropEl.classList.add("visible"),this.triggerEl.classList.add("hidden")}close(){this.isOpen=!1,this.drawerEl.classList.remove("open"),this.backdropEl.classList.remove("visible"),this.triggerEl.classList.remove("hidden")}toggleOpen(){this.isOpen?this.close():this.open()}}class O{constructor(){f(this,"hostEl",null);f(this,"shadowRoot",null);f(this,"overlayManager",null);f(this,"sidePanel",null);f(this,"detectedImages",[]);f(this,"settings",{enabled:!0,minSize:100,showBadges:!0,autoUpgradeUrls:!0,downloadAsZip:!0,namingPattern:"jewelry"});f(this,"scanDebounceTimer",null);f(this,"observer",null);f(this,"warmUpInterval",null);f(this,"isRafPending",!1);this.init()}async init(){try{if(chrome.storage&&chrome.storage.sync){const e=await chrome.storage.sync.get("diamond_settings");e&&e.diamond_settings&&(this.settings={...this.settings,...e.diamond_settings})}}catch{}if(this.setupShadowDOM(),this.setupListeners(),this.settings.enabled){try{this.scanAndRender()}catch(e){console.warn("Diamond Master: Init scan caught",e)}this.setupMutationObserver(),this.startWarmUp()}else this.sidePanel&&this.sidePanel.update([],this.settings);window.addEventListener("scroll",()=>{!this.settings.enabled||this.isRafPending||(this.isRafPending=!0,window.requestAnimationFrame(()=>{this.overlayManager&&this.overlayManager.updatePositions(),this.isRafPending=!1}))},{passive:!0})}setupShadowDOM(){if(document.getElementById("diamond-clarity-root"))return;const e=document.documentElement||document.body;if(!e)return;this.hostEl=document.createElement("div"),this.hostEl.id="diamond-clarity-root",this.hostEl.style.cssText="all: initial; position: absolute; top: 0; left: 0; width: 100%; height: 0; z-index: 2147483647; pointer-events: none;",e.appendChild(this.hostEl),this.shadowRoot=this.hostEl.attachShadow({mode:"open"});const s=document.createElement("style");s.textContent=`${Q}
${J}`,this.shadowRoot.appendChild(s),this.overlayManager=new ee(this.shadowRoot,(t,i)=>this.handleImageSelectToggle(t,i),t=>this.handleDownloadSingle(t)),this.sidePanel=new te(this.shadowRoot,{onDownloadSingle:t=>this.handleDownloadSingle(t),onDownloadAllZip:()=>this.handleDownloadAllZip(),onDownloadSelected:()=>this.handleDownloadSelected(),onSelectAll:()=>this.handleSelectAll(),onDeselectAll:()=>this.handleDeselectAll(),onToggleImageSelect:(t,i)=>this.handleImageSelectToggle(t,i),onToggleEnabled:()=>this.handleToggleEnabled()})}startWarmUp(){let e=0;this.warmUpInterval=window.setInterval(()=>{e++,this.settings.enabled&&this.scanAndRender(),e>=5&&this.warmUpInterval&&(window.clearInterval(this.warmUpInterval),this.warmUpInterval=null)},1500)}scanAndRender(){if(this.settings.enabled)try{const e=new Map;for(let s=0;s<this.detectedImages.length;s++){const t=this.detectedImages[s];t.selected&&e.set(t.masterSrc,!0)}this.detectedImages=Z(this.settings);for(let s=0;s<this.detectedImages.length;s++){const t=this.detectedImages[s];e.get(t.masterSrc)&&(t.selected=!0)}this.overlayManager&&this.overlayManager.renderBadges(this.detectedImages,this.settings.showBadges),this.sidePanel&&this.sidePanel.update(this.detectedImages,this.settings)}catch(e){console.warn("Diamond Master: scanAndRender caught",e)}}scheduleScan(){this.settings.enabled&&(this.scanDebounceTimer&&window.clearTimeout(this.scanDebounceTimer),this.scanDebounceTimer=window.setTimeout(()=>{this.scanAndRender()},500))}setupMutationObserver(){this.observer&&this.observer.disconnect(),this.observer=new MutationObserver(s=>{let t=!1;for(let i=0;i<s.length;i++){const r=s[i];if(r.type==="childList"&&r.addedNodes.length>0){t=!0;break}else if(r.type==="attributes"){t=!0;break}}t&&this.scheduleScan()});const e=document.documentElement||document.body;e&&this.observer.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","data-src","poster"]})}setupListeners(){chrome.runtime.onMessage.addListener((e,s,t)=>(e.type==="SELECT_ALL"?(this.handleSelectAll(),t({success:!0,count:this.detectedImages.length})):e.type==="DESELECT_ALL"?(this.handleDeselectAll(),t({success:!0})):e.type==="DOWNLOAD_ALL"?(this.handleDownloadAllZip(),t({success:!0,count:this.detectedImages.length})):e.type==="TOGGLE_OVERLAY"?(this.handleToggleBadges(),t({success:!0,showBadges:this.settings.showBadges})):e.type==="TOGGLE_ENABLED"?(this.handleToggleEnabled(e.enabled),t({success:!0,enabled:this.settings.enabled})):e.type==="OPEN_SIDE_PANEL"?(this.sidePanel&&this.sidePanel.open(),t({success:!0})):e.type==="GET_PAGE_IMAGES"?t({images:this.detectedImages.map(i=>({id:i.id,url:i.masterSrc,width:i.naturalWidth||i.width,height:i.naturalHeight||i.height,qualityLabel:i.qualityLabel,sourceType:i.sourceType,selected:i.selected,filename:i.filename,mediaType:i.mediaType||"image",videoPoster:i.videoPoster})),settings:this.settings}):e.type==="UPDATE_SETTINGS"&&(e.settings&&(this.settings={...this.settings,...e.settings},this.saveSettings(),this.scanAndRender()),t({success:!0,images:this.detectedImages.map(i=>({id:i.id,url:i.masterSrc,width:i.naturalWidth||i.width,height:i.naturalHeight||i.height,qualityLabel:i.qualityLabel,sourceType:i.sourceType,selected:i.selected,filename:i.filename,mediaType:i.mediaType||"image",videoPoster:i.videoPoster}))})),!0))}handleToggleEnabled(e){this.settings.enabled=e!==void 0?e:!this.settings.enabled,this.saveSettings(),this.settings.enabled?(this.setupMutationObserver(),this.scanAndRender(),this.startWarmUp()):(this.observer&&this.observer.disconnect(),this.warmUpInterval&&(window.clearInterval(this.warmUpInterval),this.warmUpInterval=null),this.overlayManager&&this.overlayManager.renderBadges([],!1),this.sidePanel&&this.sidePanel.update([],this.settings))}handleImageSelectToggle(e,s){const t=this.detectedImages.find(i=>i.id===e);t&&(t.selected=s),this.overlayManager&&this.overlayManager.updateSelectionState(this.detectedImages),this.sidePanel&&this.sidePanel.update(this.detectedImages,this.settings)}handleSelectAll(){for(let e=0;e<this.detectedImages.length;e++)this.detectedImages[e].selected=!0;this.overlayManager&&this.overlayManager.updateSelectionState(this.detectedImages),this.sidePanel&&this.sidePanel.update(this.detectedImages,this.settings)}handleDeselectAll(){for(let e=0;e<this.detectedImages.length;e++)this.detectedImages[e].selected=!1;this.overlayManager&&this.overlayManager.updateSelectionState(this.detectedImages),this.sidePanel&&this.sidePanel.update(this.detectedImages,this.settings)}handleToggleBadges(){this.settings.showBadges=!this.settings.showBadges,this.saveSettings(),this.overlayManager&&this.overlayManager.renderBadges(this.detectedImages,this.settings.showBadges)}handleDownloadSingle(e){const s={type:"DOWNLOAD_SINGLE",images:[{url:e.masterSrc,filename:e.filename}]};chrome.runtime.sendMessage(s)}handleDownloadSelected(){const e=this.detectedImages.filter(n=>n.selected);if(e.length===0)return;if(e.length===1){this.handleDownloadSingle(e[0]);return}const s=window.location.hostname.replace("www.","").split(".")[0]||"media",i=`${(document.title||s).replace(/[^a-zA-Z0-9_-]+/g,"_").slice(0,30)}_master_collection.zip`,r={type:"DOWNLOAD_BATCH",images:e.map(n=>({url:n.masterSrc,filename:n.filename})),asZip:!0,zipFilename:i};chrome.runtime.sendMessage(r)}handleDownloadAllZip(){if(this.detectedImages.length===0)return;const e=window.location.hostname.replace("www.","").split(".")[0]||"media",t=`${(document.title||e).replace(/[^a-zA-Z0-9_-]+/g,"_").slice(0,30)}_all_master_media.zip`,i={type:"DOWNLOAD_BATCH",images:this.detectedImages.map(r=>({url:r.masterSrc,filename:r.filename})),asZip:!0,zipFilename:t};chrome.runtime.sendMessage(i)}saveSettings(){try{chrome.storage&&chrome.storage.sync&&chrome.storage.sync.set({diamond_settings:this.settings})}catch{}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>new O):new O})();
