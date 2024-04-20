import "./style.css";

import { createCanvas, loadImage } from "canvas";

async function handleImageUpload(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = async function (e) {
    const image = e.target.result;
    const originalName = file.name;

    // add timestamp
    const newDate = new Date().toISOString().split("T")[0]; // current date in YYYY-MM-DD format
    const modifiedImage = await addTimestamp(image, newDate); // pass image data URL instead of file

    // preview image
    const preview = document.querySelector("#imagePreview");
    preview.src = modifiedImage;

    //download button and set download link
    const downloadBtn = document.querySelector("#downloadBtn");
    downloadBtn.href = modifiedImage;
    const fileName = `stamped_${originalName}`;

    downloadBtn.download = fileName;
    downloadBtn.removeAttribute("disabled");
  };

  reader.readAsDataURL(file);
}

async function addTimestamp(imageDataUrl, newDate) {
  const image = await loadImage(imageDataUrl);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  const fontFaceStyle = document.createElement("style");
  fontFaceStyle.textContent = `
      @font-face {
        font-family: 'AlarmClock';
        src: url('./fonts/alarmClock.ttf') format('truetype');
      }
    `;
  document.head.appendChild(fontFaceStyle);

  ctx.drawImage(image, 0, 0, image.width, image.height);

  // set font for text
  ctx.font = "70px AlarmClock"; // loaded font here (not working)

  // format date for retro look
  const dtObject = new Date(newDate);
  const formattedDate = dtObject.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  // text
  ctx.fillStyle = "#ff8201";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "right";

  //  shadow effect
  ctx.shadowColor = "#ff1e0a";
  ctx.shadowBlur = 10;
  ctx.fillText(formattedDate, canvas.width - 50, canvas.height - 50);

  // reset shadow
  ctx.shadowColor = "transparent";

  // convert to data URL
  const dataUrl = canvas.toDataURL("image/jpeg");

  return dataUrl;
}

function initializeComponent() {
  const template = `
        <div>
        <h1 class="kodak-text">Retro Date Stamp</h1>
            <input type="file" id="imageInput" accept="image/jpeg, image/jpg, image/JPG">
            
            <a id="downloadBtn" disabled>Download</a>
        </div>
        <div>
            <h3>Image Preview</h3>
            <img id="imagePreview" src="./logo.png" alt="Preview">
        </div>
    `;

  document.querySelector("#app").innerHTML = template;

  document
    .querySelector("#imageInput")
    .addEventListener("change", handleImageUpload);
}

initializeComponent();
