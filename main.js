//nothing to see here!

import "./style.css";
import { createCanvas, loadImage } from "canvas";
import example from "/example.png";
import Segment from "/fonts/alarmClock.ttf";
import SixFour from "/fonts/sixtyfour.ttf";
import Beba from "/fonts/BebasNeue.ttf";

async function handleImageUpload(event) {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const reader = new FileReader();
    reader.onload = async function (e) {
      const image = e.target.result;
      const originalName = file.name;

      const fontSelector = document.querySelector("#fontSelector");
      const dateFormatSelector = document.querySelector("#dateFormatSelector");
      const customDateInput = document.querySelector("#customDateInput");

      const selectedFont =
        fontSelector.options[fontSelector.selectedIndex].value;
      const dateFormat = dateFormatSelector.value;
      const customDate = customDateInput.value;

      const modifiedImage = await addTimestamp(
        image,
        selectedFont,
        customDate,
        dateFormat,
      );

      const previewContainer = document.querySelector("#previewContainer");

      const preview = document.createElement("img");
      preview.src = modifiedImage;

      //const downloadContainer = document.querySelector("#downloadContainer");
      const downloadBtn = document.createElement("a");
      downloadBtn.href = modifiedImage;
      downloadBtn.download = `stamped_${originalName}`;
      downloadBtn.textContent = `Download ${originalName}`;

      previewContainer.appendChild(downloadBtn);
      previewContainer.appendChild(preview);

      if (previewContainer.childElementCount > 0) {
        document.querySelector("#imagePreview").style.display = "none";
      }
    };

    reader.readAsDataURL(file);
  }
}

async function addTimestamp(
  imageDataUrl,
  selectedFont,
  customDate,
  dateFormat,
) {
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

  let dtObject = new Date();
  if (customDate) {
    dtObject = new Date(customDate); // custom date if provided
  } else {
    dtObject = new Date(); // current date if no custom date
  }

  let formattedDate = dtObject.toLocaleDateString();

  if (dateFormat === "US") {
    formattedDate = dtObject.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  } else if (dateFormat === "UK") {
    formattedDate = dtObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

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
            <option value="${Beba}">2000's</option>
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
        <img id="imagePreview" src="${example}" alt="Preview">
        <div id="downloadContainer"></div>
        <div id="previewContainer"></div>
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

  document
    .querySelector("#dateFormatSelector")
    .addEventListener("change", () => {
      const selectedFont = fontSelector.value;
      const selectedDateFormat = dateFormatSelector.value;
      let imagePreview = document.querySelector("#imagePreview");
      imagePreview = image.src;
      addTimestamp(imagePreview, selectedFont, selectedDateFormat).then(
        (modifiedImage) => {
          document.querySelector("#imagePreview").src = modifiedImage;
        },
      );
      window.alert(
        "This project is in Beta. 🙀 For UK An 'Invalid Date' may appear, just pick a date. To select multiple files, hold down the CTRL or SHIFT key while selecting.",
      );
    });

  document.querySelector("#customDateInput").addEventListener("change", () => {
    const fontSelector = document.querySelector("#fontSelector");
    const dateFormatSelector = document.querySelector("#dateFormatSelector");

    const selectedFont = fontSelector.options[fontSelector.selectedIndex].value;
    const dateFormat = dateFormatSelector.value;
    const customDate = document.querySelector("#customDateInput").value;

    let imagePreview = document.querySelector("#imagePreview").src;
    imagePreview = image.src; //apply the stamp to img (messy)
    addTimestamp(imagePreview, selectedFont, customDate, dateFormat).then(
      (modifiedImage) => {
        document.querySelector("#imagePreview").src = modifiedImage;
      },
    );
  });
}

initializeComponent();
