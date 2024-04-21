import "./style.css";
import { createCanvas, loadImage } from "canvas";
import example from "/example.png";
import Segment from "/fonts/alarmClock.ttf";
import SixFour from "/fonts/sixtyfour.ttf";

async function handleImageUpload(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = async function (e) {
    const image = e.target.result;
    const originalName = file.name;

    let selectedFont = fontSelector.options[fontSelector.selectedIndex].value;
    const modifiedImage = await addTimestamp(image, selectedFont); // pass image data URL instead of file

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

async function addTimestamp(imageDataUrl, selectedFont) {
  const image = await loadImage(imageDataUrl);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  const defaultFont = "./fonts/alarmClock.ttf";

  const fontUrl = selectedFont ? selectedFont : defaultFont;

  const font = new FontFace("SelectedFont", `url(${fontUrl})`);
  await font.load();
  document.fonts.add(font);

  ctx.drawImage(image, 0, 0, image.width, image.height);

  // set font for text
  ctx.font = "70px SelectedFont"; //dynamically loaded font

  const dtObject = new Date();
  const formattedDate = dtObject.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  // text
  ctx.fillStyle = "#ff8201";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "right";

  //shadow effect
  ctx.shadowColor = "#ff1e0a";
  ctx.shadowBlur = 10;

  ctx.fillText(formattedDate, canvas.width - 50, canvas.height - 50);

  //reset shadow
  ctx.shadowColor = "transparent";

  // convert to data URL
  const dataUrl = canvas.toDataURL("image/jpeg");

  return dataUrl;
}

function initializeComponent() {
  const template = `
       <div>
        <h1 class="">Retro Date Stamp</h1>
        <p>1. Pick Date Stamp Font</p>
        <label for="fontSelector"></label>
        <select id="fontSelector">
            <option value="${Segment}">Segment</option>
            <option value="${SixFour}">Digital64</option>
        </select>
        <div>
        <label for="files" class="btn">2. Upload JPEG</label>
        <input type="file" id="imageInput" accept="image/jpeg, image/jpg, image/JPG">
        </div>
        <a id="downloadBtn" disabled>3. Download</a>
    </div>
    <div>
        <h3>Image Preview</h3>
        <img id="imagePreview" src="${example}" alt="Preview">
       
    </div>
    `;

  document.querySelector("#app").innerHTML = template;

  document
    .querySelector("#imageInput")
    .addEventListener("change", handleImageUpload);

  //new Image object
  const image = new Image();
  image.onload = async function () {
    //call addTimestamp
    const modifiedImage = await addTimestamp(image.src);
    //update the image preview
    imagePreview.src = modifiedImage;
  };

  image.src = imagePreview.src;

  document.querySelector("#fontSelector").addEventListener("change", () => {
    //reapply timestamp with the selected font
    const fontSelector = document.querySelector("#fontSelector");
    let selectedFont = fontSelector.options[fontSelector.selectedIndex].value;
    let imagePreview = document.querySelector("#imagePreview").src;

    imagePreview = image.src; //apply the stamp to img

    addTimestamp(imagePreview, selectedFont).then((modifiedImage) => {
      document.querySelector("#imagePreview").src = modifiedImage;
    });
  });
}

initializeComponent();
