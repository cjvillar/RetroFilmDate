import { createCanvas, loadImage } from "canvas";

import Segment from "/fonts/alarmClock.ttf";
import SixFour from "/fonts/sixtyfour.ttf";
import Beba from "/fonts/BebasNeue.ttf";

//add time stamp func
const addTimestamp = async (file, selectedFont, customDate, dateFormat) => {
  const imageDataUrl = URL.createObjectURL(file);
  const image = await loadImage(imageDataUrl);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0, image.width, image.height);

  const defaultFont = "./fonts/alarmClock.ttf";

  const fontUrl = selectedFont ? selectedFont : defaultFont;
  //const fontUrl = selectedFont || "./fonts/alarmClock.ttf";
  const font = new FontFace("SelectedFont", `url(${fontUrl})`);
  await font.load();
  document.fonts.add(font);

  // customize date format based on selected option
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

    const selectedFont = "./fonts/alarmClock.ttf"; // font path
    const dateFormat = "US"; // default date format 

    try {
      const modifiedImageUrl = await addTimestamp(
        file,
        selectedFont,
        null, // customDate null for current date
        dateFormat,
      );
      modifiedImagesArray.push(modifiedImageUrl);
      
    } catch (error) {
      console.error("Error adding timestamp:", error);
    
    }
  }
  setModifiedImages(modifiedImagesArray);
};

export { addTimestamp, formatDate, handleImageUpload };
