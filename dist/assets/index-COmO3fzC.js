(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) a(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const i of t.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && a(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
          ? (t.credentials = "omit")
          : (t.credentials = "same-origin"),
      t
    );
  }
  function a(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = n(e);
    fetch(e.href, t);
  }
})();
var u = function (r, o) {
    return Object.assign(document.createElement("canvas"), {
      width: r,
      height: o,
    });
  },
  f = function (r, o) {
    return new Promise(function (n, a) {
      const e = Object.assign(document.createElement("img"), o);
      function t() {
        (e.onload = null), (e.onerror = null);
      }
      (e.onload = function () {
        t(), n(e);
      }),
        (e.onerror = function () {
          t(), a(new Error('Failed to load the image "' + r + '"'));
        }),
        (e.src = r);
    });
  };
const g = "/RetroFilmDate/example.png",
  p = "/RetroFilmDate/fonts/alarmClock.ttf",
  h = "/RetroFilmDate/fonts/sixtyfour.ttf",
  w = "/RetroFilmDate/fonts/BebasNeue.ttf";
async function v(r) {
  const o = r.target.files[0],
    n = new FileReader();
  (n.onload = async function (a) {
    const e = a.target.result,
      t = o.name;
    let i = fontSelector.options[fontSelector.selectedIndex].value;
    const c = await s(e, i),
      d = document.querySelector("#imagePreview");
    d.src = c;
    const l = document.querySelector("#downloadBtn");
    l.href = c;
    const m = `stamped_${t}`;
    (l.download = m), l.removeAttribute("disabled");
  }),
    n.readAsDataURL(o);
}
async function s(r, o) {
  const n = await f(r),
    a = u(n.width, n.height),
    e = a.getContext("2d"),
    i = o || "./fonts/alarmClock.ttf",
    c = new FontFace("SelectedFont", `url(${i})`);
  await c.load(),
    document.fonts.add(c),
    e.drawImage(n, 0, 0, n.width, n.height),
    (e.font = "70px SelectedFont");
  const l = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return (
    (e.fillStyle = "#ff8201"),
    (e.textBaseline = "bottom"),
    (e.textAlign = "right"),
    (e.shadowColor = "#ff1e0a"),
    (e.shadowBlur = 10),
    e.fillText(l, a.width - 50, a.height - 50),
    (e.shadowColor = "transparent"),
    a.toDataURL("image/jpeg")
  );
}
function y() {
  const r = `
       <div>
        <h1 class="">Retro Date Stamp</h1>
        <p>1. Pick Date Stamp Font</p>
        <label for="fontSelector"></label>
        <select id="fontSelector">
            <option value="${p}">Segment</option>
            <option value="${h}">Digital64</option>
            <option value="${w}">2000's</option>
        </select>
        <div>
        <label for="files" class="btn">2. Upload JPEG</label>
        <input type="file" id="imageInput" accept="image/jpeg, image/jpg, image/JPG">
        </div>
        <a id="downloadBtn" disabled>3. Download</a>
    </div>
    <div>
        <h3>Image Preview</h3>
        <img id="imagePreview" src="${g}" alt="Preview">
       
    </div>
    `;
  (document.querySelector("#app").innerHTML = r),
    document.querySelector("#imageInput").addEventListener("change", v);
  const o = new Image();
  (o.onload = async function () {
    const n = await s(o.src);
    imagePreview.src = n;
  }),
    (o.src = imagePreview.src),
    document.querySelector("#fontSelector").addEventListener("change", () => {
      const n = document.querySelector("#fontSelector");
      let a = n.options[n.selectedIndex].value,
        e = document.querySelector("#imagePreview").src;
      (e = o.src),
        s(e, a).then((t) => {
          document.querySelector("#imagePreview").src = t;
        });
    });
}
y();
