(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();var h=function(i,o){return Object.assign(document.createElement("canvas"),{width:i,height:o})},y=function(i,o){return new Promise(function(n,r){const e=Object.assign(document.createElement("img"),o);function t(){e.onload=null,e.onerror=null}e.onload=function(){t(),n(e)},e.onerror=function(){t(),r(new Error('Failed to load the image "'+i+'"'))},e.src=i})};const F="/RetroFilmDate/example.png",D="/RetroFilmDate/fonts/alarmClock.ttf",P="/RetroFilmDate/fonts/sixtyfour.ttf",q="/RetroFilmDate/fonts/BebasNeue.ttf";async function I(i){const o=i.target.files;for(let n=0;n<o.length;n++){const r=o[n],e=new FileReader;e.onload=async function(t){const a=t.target.result,l=r.name,d=document.querySelector("#fontSelector"),m=document.querySelector("#dateFormatSelector"),c=document.querySelector("#customDateInput"),s=d.options[d.selectedIndex].value,g=m.value,w=c.value,v=await u(a,s,w,g),p=document.querySelector("#previewContainer"),S=document.createElement("img");S.src=v;const f=document.createElement("a");f.href=v,f.download=`stamped_${l}`,f.textContent=`Download ${l}`,p.appendChild(f),p.appendChild(S),p.childElementCount>0&&(document.querySelector("#imagePreview").style.display="none")},e.readAsDataURL(r)}}async function u(i,o,n,r){const e=await y(i),t=h(e.width,e.height),a=t.getContext("2d"),d=o||"./fonts/alarmClock.ttf",m=new FontFace("SelectedFont",`url(${d})`);await m.load(),document.fonts.add(m),a.drawImage(e,0,0,e.width,e.height),a.font="70px SelectedFont";let c=new Date;n?c=new Date(n):c=new Date;let s=c.toLocaleDateString();return r==="US"?s=c.toLocaleDateString("en-US",{day:"2-digit",month:"2-digit",year:"2-digit"}):r==="UK"&&(s=c.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"})),a.fillStyle="#ff8201",a.textBaseline="bottom",a.textAlign="right",a.shadowColor="#ff1e0a",a.shadowBlur=10,a.fillText(s,t.width-50,t.height-50),a.shadowColor="transparent",t.toDataURL("image/jpeg")}function C(){const i=`
       <div>
        <h1 class="">Retro Date Stamp</h1>
        <p>1. Pick Date Stamp Font</p>
        <label for="fontSelector"></label>
        <select id="fontSelector">
            <option value="${D}">Segment</option>
            <option value="${P}">Digital64</option>
            <option value="${q}">2000's</option>
        </select>
        <select id="dateFormatSelector">
          <option value="US">US</option>
          <option value="UK">UK</option>
        </select>
        <input id="customDateInput" type="date">
        <div>
        <label for="files" class="btn">2. Upload JPEG</label>
        <input type="file" id="imageInput" accept="image/jpeg, image/jpg, image/JPG">
        </div>
        <p id="downloadBtn" disabled>3. Download</p>
    </div>
    <div>
        <h3>Image Preview</h3>
        <img id="imagePreview" src="${F}" alt="Preview">
        <div id="downloadContainer"></div>
        <div id="previewContainer"></div>
    </div>
    `;document.querySelector("#app").innerHTML=i,document.querySelector("#imageInput").addEventListener("change",I);const o=new Image;o.onload=async function(){const n=await u(o.src);imagePreview.src=n},o.src=imagePreview.src,document.querySelector("#fontSelector").addEventListener("change",()=>{const n=document.querySelector("#fontSelector");let r=n.options[n.selectedIndex].value,e=document.querySelector("#imagePreview").src;e=o.src,u(e,r).then(t=>{document.querySelector("#imagePreview").src=t})}),document.querySelector("#dateFormatSelector").addEventListener("change",()=>{const n=fontSelector.value,r=dateFormatSelector.value;let e=document.querySelector("#imagePreview");e=o.src,u(e,n,r).then(t=>{document.querySelector("#imagePreview").src=t}),window.alert("This project is in Beta. 🙀 For UK An 'Invalid Date' may appear, just pick a date. To select multiple files, hold down the CTRL or SHIFT key while selecting.")}),document.querySelector("#customDateInput").addEventListener("change",()=>{const n=document.querySelector("#fontSelector"),r=document.querySelector("#dateFormatSelector"),e=n.options[n.selectedIndex].value,t=r.value,a=document.querySelector("#customDateInput").value;let l=document.querySelector("#imagePreview").src;l=o.src,u(l,e,a,t).then(d=>{document.querySelector("#imagePreview").src=d})})}C();
