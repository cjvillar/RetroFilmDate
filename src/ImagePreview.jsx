import React, { useState, useEffect } from "react";
import { addTimestamp } from "./utils";
import "./index.css";
import Segment from "./assets/fonts/alarmClock.ttf";
import SixFour from "./assets/fonts/sixtyfour.ttf";
import Bebas from "./assets/fonts/BebasNeue.ttf";

const ImagePreview = ({ modifiedImage }) => {
  const [selectedFont, setSelectedFont] = useState();
  const [dateFormat, setDateFormat] = useState("US");
  const [customDate, setCustomDate] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [reloadImage, setReloadImage] = useState(false);

  useEffect(() => {
    updatePreviewImages();
  }, [modifiedImage, selectedFont, dateFormat, customDate, reloadImage]);

  const updatePreviewImages = async () => {
    try {
      const updatedImages = await Promise.all(
        modifiedImage.map(async (imageUrl) => {
          const modifiedImageUrl = await addTimestamp(
            imageUrl,
            selectedFont,
            customDate,
            dateFormat,
          );
          return modifiedImageUrl;
        }),
      );
      setPreviewImages(updatedImages);
    } catch (error) {
      console.error("Error updating preview images:", error);
    }
  };

  const handleDownload = (imageUrl, originalName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = `stamped_${originalName}`;
    downloadLink.click();
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
    setReloadImage(!reloadImage);
  };

  const handleDateFormatChange = (e) => {
    setDateFormat(e.target.value);
    setReloadImage(!reloadImage);
  };

  const handleCustomDateChange = (e) => {
    setCustomDate(e.target.value);
    setReloadImage(!reloadImage);
  };

  return (
    <div>
      <h3>Image Preview</h3>
      {Array.isArray(previewImages) &&
        previewImages.map((imageUrl, index) => (
          <div key={index}>
            <img
              key={reloadImage}
              src={imageUrl}
              alt={`Preview ${index}`}
              style={{ width: "90%", margin: "30px" }}
            />
            <button
              onClick={() => handleDownload(imageUrl, `image_${index}.jpg`)}
            >
              Download
            </button>
            <select
              id="fontSelector"
              value={selectedFont}
              onChange={handleFontChange}
            >
              <option value={Segment}>Segment</option>
              <option value={SixFour}>Digital64</option>
              <option value={Bebas}>2000's</option>
            </select>
            <select
              id="dateFormatSelector"
              value={dateFormat}
              onChange={handleDateFormatChange}
            >
              <option value="US">US</option>
              <option value="UK">UK</option>
            </select>
            <input
              id="customDateInput"
              type="date"
              value={customDate || ""}
              onChange={handleCustomDateChange}
            />
          </div>
        ))}
    </div>
  );
};

export default ImagePreview;
