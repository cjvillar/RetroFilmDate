import { createCanvas, loadImage } from "canvas";

import Segment from "./assets/fonts/alarmClock.ttf";

const addTimestamp = async (
  imageDataUrl,
  selectedFont,
  customDate,
  dateFormat,
) => {
  const image = await loadImage(imageDataUrl);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0, image.width, image.height);

  const defaultFont = Segment;
  const fontUrl = selectedFont ? selectedFont : defaultFont;

  const font = new FontFace("SelectedFont", `url(${fontUrl})`);

  await font.load();
  document.fonts.add(font);

  // custom date format
  let dtObject = customDate ? new Date(customDate) : new Date();
  let formattedDate = formatDate(dtObject, dateFormat);

  ctx.font = "70px SelectedFont";
  ctx.fillStyle = "#ff8201";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "right";

  ctx.fillText(formattedDate, canvas.width - 50, canvas.height - 50);

  const dataUrl = canvas.toDataURL("image/jpeg");
  return dataUrl;
};

const formatDate = (dateObject, dateFormat) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  if (dateFormat === "US") {
    return dateObject.toLocaleDateString("en-US", options);
  } else if (dateFormat === "UK") {
    return dateObject.toLocaleDateString("en-GB", options);
  }

  return dateObject.toLocaleDateString(undefined, options); // default date format
};

const handleImageUpload = async (
  event,
  currentImages = [],
  setModifiedImages,
) => {
  const files = event.target.files;
  const modifiedImagesArray = Array.isArray(currentImages)
    ? [...currentImages]
    : [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    try {
      const imageDataUrl = URL.createObjectURL(file);
      modifiedImagesArray.push(imageDataUrl);
    } catch (error) {
      console.error("Error adding timestamp:", error);
    }
  }
  setModifiedImages(modifiedImagesArray);
};

export { addTimestamp, formatDate, handleImageUpload };
