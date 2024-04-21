(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const i of t.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
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
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = o(e);
    fetch(e.href, t);
  }
})();
var u = function (a, n) {
    return Object.assign(document.createElement("canvas"), {
      width: a,
      height: n,
    });
  },
  m = function (a, n) {
    return new Promise(function (o, r) {
      const e = Object.assign(document.createElement("img"), n);
      function t() {
        (e.onload = null), (e.onerror = null);
      }
      (e.onload = function () {
        t(), o(e);
      }),
        (e.onerror = function () {
          t(), r(new Error('Failed to load the image "' + a + '"'));
        }),
        (e.src = a);
    });
  };
const f = "/RetroFilmDate/example.png",
  g = "/RetroFilmDate/fonts/alarmClock.ttf",
  p = "/RetroFilmDate/fonts/sixtyfour.ttf";
async function w(a) {
  const n = a.target.files[0],
    o = new FileReader();
  (o.onload = async function (r) {
    const e = r.target.result,
      t = n.name;
    fontSelector.options[fontSelector.selectedIndex].value;
    const i = await s(e, newDate),
      c = document.querySelector("#imagePreview");
    c.src = i;
    const l = document.querySelector("#downloadBtn");
    l.href = i;
    const d = `stamped_${t}`;
    (l.download = d), l.removeAttribute("disabled");
  }),
    o.readAsDataURL(n);
}
async function s(a, n) {
  const o = await m(a),
    r = u(o.width, o.height),
    e = r.getContext("2d"),
    t = new FontFace("SelectedFont", `url(${n})`);
  await t.load(),
    document.fonts.add(t),
    e.drawImage(o, 0, 0, o.width, o.height),
    (e.font = "70px SelectedFont");
  const c = new Date().toLocaleDateString("en-US", {
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
    e.fillText(c, r.width - 50, r.height - 50),
    (e.shadowColor = "transparent"),
    r.toDataURL("image/jpeg")
  );
}
function S() {
  const a = `
        <div>
        <h1 class="">Retro Date Stamp</h1>
            <input type="file" id="imageInput" accept="image/jpeg, image/jpg, image/JPG">
            <label for="fontSelector">Select Font:</label>
            <select id="fontSelector">
              <option value="${g}">Segment</option>
              <option value="${p}">Digital64</option>
             
            </select>
            <a id="downloadBtn" disabled>Download</a>
        </div>
        <div>
            <h3>Image Preview</h3>
            <img id="imagePreview" src="${f}" alt="Preview">
        </div>
    `;
  (document.querySelector("#app").innerHTML = a),
    document.querySelector("#imageInput").addEventListener("change", w);
  const n = "./fonts/alarmClock.ttf",
    o = document.querySelector("#fontSelector");
  for (let t = 0; t < o.options.length; t++)
    if (o.options[t].value === n) {
      o.selectedIndex = t;
      break;
    }
  const r = document.querySelector("#imagePreview"),
    e = new Image();
  (e.onload = async function () {
    const t = await s(e.src, n);
    r.src = t;
  }),
    (e.src = r.src),
    document.querySelector("#fontSelector").addEventListener("change", () => {
      const t = document.querySelector("#fontSelector");
      let i = t.options[t.selectedIndex].value;
      const c = document.querySelector("#imagePreview").src;
      new Date().toISOString().split("T")[0],
        s(c, i).then((l) => {
          document.querySelector("#imagePreview").src = l;
        });
    }),
    document
      .querySelector("#fontSelector")
      .addEventListener("change", async () => {
        const t = document.querySelector("#fontSelector"),
          i = t.options[t.selectedIndex].value,
          c = document.querySelector("#imagePreview"),
          l = await s(c.src, i);
        c.src = l;
      });
}
S();
