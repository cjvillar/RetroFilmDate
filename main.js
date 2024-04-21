import "./style.css";
import { createCanvas, loadImage } from "canvas";
import example from '/example.png';
import Segment from '/fonts/alarmClock.ttf';

async function handleImageUpload(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = async function (e) {
    const image = e.target.result;
    const originalName = file.name;

    // add timestamp
    const newDate = new Date().toISOString().split("T")[0]; // current date in YYYY-MM-DD format

    let selectedFont = fontSelector.options[fontSelector.selectedIndex].value;
    const modifiedImage = await addTimestamp(image, newDate, selectedFont); // pass image data URL instead of file

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

async function addTimestamp(imageDataUrl, newDate, selectedFont) {
  const image = await loadImage(imageDataUrl);
  const canvas = createCanvas(image.width, image.height);

  const ctx = canvas.getContext("2d");

  const font = new FontFace("SelectedFont", `url(${selectedFont})`);
  await font.load();
  document.fonts.add(font);

  ctx.drawImage(image, 0, 0, image.width, image.height);

  // set font for text
  ctx.font = "70px SelectedFont"; // Use the dynamically loaded font here

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
        <h1 class="">Retro Date Stamp</h1>
            <input type="file" id="imageInput" accept="image/jpeg, image/jpg, image/JPG">
            <label for="fontSelector">Select Font:</label>
            <select id="fontSelector">
              <option value="${Segment}">Segment</option>
             
            </select>
            <a id="downloadBtn" disabled>Download</a>
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

  //set initial value for font selector
  const defaultFont = "./fonts/alarmClock.ttf"; //default font
  const fontSelector = document.querySelector("#fontSelector");
  for (let i = 0; i < fontSelector.options.length; i++) {
    if (fontSelector.options[i].value === defaultFont) {
      fontSelector.selectedIndex = i;
      break;
    }
  }

  //load logo image prev with default font
  const imagePreview = document.querySelector("#imagePreview").src;
  const newDate = new Date().toISOString().split("T")[0];
  addTimestamp(imagePreview, newDate, defaultFont).then((modifiedImage) => {
    document.querySelector("#imagePreview").src = modifiedImage;
  });

  //   document.querySelector("#fontSelector").addEventListener("change", () => {

  //     //reapply timestamp with the selected font
  //     const fontSelector = document.querySelector("#fontSelector");
  //     let selectedFont = fontSelector.options[fontSelector.selectedIndex].value;
  //     const imagePreview = document.querySelector("#imagePreview").src;
  //     const newDate = new Date().toISOString().split("T")[0];

  //     addTimestamp(imagePreview, newDate, selectedFont).then((modifiedImage) => {
  //       document.querySelector("#imagePreview").src = modifiedImage;
  //     });
  //   });

  // Event listener for font selection change
  document
    .querySelector("#fontSelector")
    .addEventListener("change", async () => {
      const fontSelector = document.querySelector("#fontSelector");
      const selectedFont =
        fontSelector.options[fontSelector.selectedIndex].value;
      const imagePreview = document.querySelector("#imagePreview");

      // Reapply timestamp with the selected font
      const newDate = new Date().toISOString().split("T")[0];
      const modifiedImage = await addTimestamp(
        imagePreview.src,
        newDate,
        selectedFont,
      );

      // Update image preview with the modified image
      imagePreview.src = modifiedImage;
    });
}

initializeComponent();
