(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();var m=function(a,n){return Object.assign(document.createElement("canvas"),{width:a,height:n})},u=function(a,n){return new Promise(function(o,r){const e=Object.assign(document.createElement("img"),n);function t(){e.onload=null,e.onerror=null}e.onload=function(){t(),o(e)},e.onerror=function(){t(),r(new Error('Failed to load the image "'+a+'"'))},e.src=a})};async function f(a){const n=a.target.files[0],o=new FileReader;o.onload=async function(r){const e=r.target.result,t=n.name,i=new Date().toISOString().split("T")[0],c=await g(e,i),l=document.querySelector("#imagePreview");l.src=c;const d=document.querySelector("#downloadBtn");d.href=c;const s=`stamped_${t}`;d.download=s,d.removeAttribute("disabled")},o.readAsDataURL(n)}async function g(a,n){const o=await u(a),r=m(o.width,o.height),e=r.getContext("2d"),t=document.createElement("style");t.textContent=`
      @font-face {
        font-family: 'AlarmClock';
        src: url('./fonts/alarmClock.ttf') format('truetype');
      }
    `,document.head.appendChild(t),e.drawImage(o,0,0,o.width,o.height),e.font="70px AlarmClock";const c=new Date(n).toLocaleDateString("en-US",{day:"2-digit",month:"2-digit",year:"2-digit"});return e.fillStyle="#ff8201",e.textBaseline="bottom",e.textAlign="right",e.shadowColor="#ff1e0a",e.shadowBlur=10,e.fillText(c,r.width-50,r.height-50),e.shadowColor="transparent",r.toDataURL("image/jpeg")}function p(){const a=`
        <div>
        <h1 class="kodak-text">Retro Date Stamp</h1>
            <input type="file" id="imageInput" accept="image/jpeg, image/jpg, image/JPG">
            
            <a id="downloadBtn" disabled>Download</a>
        </div>
        <div>
            <h3>Image Preview</h3>
            <img id="imagePreview" src="./logo.png" alt="Preview">
        </div>
    `;document.querySelector("#app").innerHTML=a,document.querySelector("#imageInput").addEventListener("change",f)}p();
