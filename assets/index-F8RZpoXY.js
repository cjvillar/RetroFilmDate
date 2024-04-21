(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) n(t);
  new MutationObserver((t) => {
    for (const e of t)
      if (e.type === "childList")
        for (const i of e.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(t) {
    const e = {};
    return (
      t.integrity && (e.integrity = t.integrity),
      t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === "use-credentials"
        ? (e.credentials = "include")
        : t.crossOrigin === "anonymous"
          ? (e.credentials = "omit")
          : (e.credentials = "same-origin"),
      e
    );
  }
  function n(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = r(t);
    fetch(t.href, e);
  }
})();
var f = function (a, o) {
    return Object.assign(document.createElement("canvas"), {
      width: a,
      height: o,
    });
  },
  g = function (a, o) {
    return new Promise(function (r, n) {
      const t = Object.assign(document.createElement("img"), o);
      function e() {
        (t.onload = null), (t.onerror = null);
      }
      (t.onload = function () {
        e(), r(t);
      }),
        (t.onerror = function () {
          e(), n(new Error('Failed to load the image "' + a + '"'));
        }),
        (t.src = a);
    });
  };
async function p(a) {
  const o = a.target.files[0],
    r = new FileReader();
  (r.onload = async function (n) {
    const t = n.target.result,
      e = o.name,
      i = new Date().toISOString().split("T")[0];
    let l = fontSelector.options[fontSelector.selectedIndex].value;
    const c = await u(t, i, l),
      s = document.querySelector("#imagePreview");
    s.src = c;
    const d = document.querySelector("#downloadBtn");
    d.href = c;
    const m = `stamped_${e}`;
    (d.download = m), d.removeAttribute("disabled");
  }),
    r.readAsDataURL(o);
}
async function u(a, o, r) {
  const n = await g(a),
    t = f(n.width, n.height),
    e = t.getContext("2d"),
    i = new FontFace("SelectedFont", `url(${r})`);
  await i.load(),
    document.fonts.add(i),
    e.drawImage(n, 0, 0, n.width, n.height),
    (e.font = "70px SelectedFont");
  const c = new Date(o).toLocaleDateString("en-US", {
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
    e.fillText(c, t.width - 50, t.height - 50),
    (e.shadowColor = "transparent"),
    t.toDataURL("image/jpeg")
  );
}
function w() {
  const a = `
        <div>
        <h1 class="">Retro Date Stamp</h1>
            <input type="file" id="imageInput" accept="image/jpeg, image/jpg, image/JPG">
            <label for="fontSelector">Select Font:</label>
            <select id="fontSelector">
              <option value="./fonts/alarmClock.ttf">Segment</option>
             
            </select>
            <a id="downloadBtn" disabled>Download</a>
        </div>
        <div>
            <h3>Image Preview</h3>
            <img id="imagePreview" src="logo.jpg" alt="Preview">
        </div>
    `;
  (document.querySelector("#app").innerHTML = a),
    document.querySelector("#imageInput").addEventListener("change", p);
  const o = "./fonts/alarmClock.ttf",
    r = document.querySelector("#fontSelector");
  for (let e = 0; e < r.options.length; e++)
    if (r.options[e].value === o) {
      r.selectedIndex = e;
      break;
    }
  const n = document.querySelector("#imagePreview").src,
    t = new Date().toISOString().split("T")[0];
  u(n, t, o).then((e) => {
    document.querySelector("#imagePreview").src = e;
  }),
    document
      .querySelector("#fontSelector")
      .addEventListener("change", async () => {
        const e = document.querySelector("#fontSelector"),
          i = e.options[e.selectedIndex].value,
          l = document.querySelector("#imagePreview"),
          c = new Date().toISOString().split("T")[0],
          s = await u(l.src, c, i);
        l.src = s;
      });
}
w();
