const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

async function addTimestamp(imagePath, newDate, outputPath) {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0, image.width, image.height);

  //font
  registerFont(path.join(__dirname, "..", "fonts", "alarm clock.ttf"), {
    family: "AlarmClock",
  });

  // format date "retro" may change
  const dtObject = new Date(newDate);
  const formattedDate = dtObject.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  //text
  ctx.font = "70px AlarmClock";
  ctx.fillStyle = "#ff8201";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "right";

  //shadow effect
  ctx.shadowColor = "#ff1e0a";
  ctx.shadowBlur = 10;
  ctx.fillText(formattedDate, canvas.width - 50, canvas.height - 50);

  ctx.shadowColor = "transparent";

  const out = fs.createWriteStream(outputPath);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on("finish", () => {
    console.log("Timestamp added successfully!");
  });
}

const imageFilePath = "../images/test2.JPG";
const newDate = "2024-04-19";
const outputFilePath = "output.jpg";

addTimestamp(imageFilePath, newDate, outputFilePath);
