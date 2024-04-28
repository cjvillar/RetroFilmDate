import React, { useState, useEffect } from "react";
import { addTimestamp, addGrainyEffect, adjustImageColor } from "./utils";
import Segment from "./assets/fonts/alarmClock.ttf";
import SixFour from "./assets/fonts/sixtyfour.ttf";
import Bebas from "./assets/fonts/BebasNeue.ttf";

const ImagePreview = ({ modifiedImage }) => {
  const [selectedFonts, setSelectedFonts] = useState([]);
  const [dateFormats, setDateFormats] = useState([]);
  const [customDates, setCustomDates] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [grainyIntensities, setGrainyIntensities] = useState([]);
  const [colorAdjustmentIntensities, setColorAdjustmentIntensities] = useState(
    [],
  );

  useEffect(() => {
    updatePreviewImages();
  }, [
    modifiedImage,
    selectedFonts,
    dateFormats,
    customDates,
    grainyIntensities,
    colorAdjustmentIntensities,
  ]);

  const updatePreviewImages = async () => {
    try {
      const updatedImages = await Promise.all(
        modifiedImage.map(async (imageUrl, index) => {
          // apply grainy effect
          let modifiedImageUrl = await addGrainyEffect(
            imageUrl,
            grainyIntensities[index],
          );

          // apply color adjustment
          modifiedImageUrl = await adjustImageColor(
            modifiedImageUrl,
            colorAdjustmentIntensities[index],
          );

          //timestamp
          modifiedImageUrl = await addTimestamp(
            modifiedImageUrl,
            selectedFonts[index] || Segment, //default font
            customDates[index],
            dateFormats[index] || "US", //default date format
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

  const handleFontChange = (e, index) => {
    const newFonts = [...selectedFonts];
    newFonts[index] = e.target.value;
    setSelectedFonts(newFonts);
  };

  const handleDateFormatChange = (e, index) => {
    const newFormats = [...dateFormats];
    newFormats[index] = e.target.value;
    setDateFormats(newFormats);
  };

  const handleCustomDateChange = (e, index) => {
    const newCustomDates = [...customDates];
    newCustomDates[index] = e.target.value;
    setCustomDates(newCustomDates);
  };

  const handleGrainyIntensityChange = (e, index) => {
    const newIntensities = [...grainyIntensities];
    newIntensities[index] = parseInt(e.target.value); // convert value to int
    setGrainyIntensities(newIntensities);
  };

  const handleColorAdjustmentIntensityChange = (e, index) => {
    const newIntensities = [...colorAdjustmentIntensities];
    newIntensities[index] = parseInt(e.target.value); // convert value to int
    setColorAdjustmentIntensities(newIntensities);
  };

  return (
    <div className=".preview">
      {Array.isArray(previewImages) &&
        previewImages.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Preview ${index}`} />
            <br></br>
            <button
              className="btn"
              onClick={() => handleDownload(imageUrl, `image_${index}.jpg`)}
            >
              Download
            </button>
            <p>|</p>
            <select
              id={`fontSelector_${index}`}
              value={selectedFonts[index]}
              onChange={(e) => handleFontChange(e, index)}
            >
              <option value={Segment}>Segment</option>
              <option value={SixFour}>Digital64</option>
              <option value={Bebas}>2000's</option>
            </select>
            <p>|</p>
            <select
              id={`dateFormatSelector_${index}`}
              value={dateFormats[index]}
              onChange={(e) => handleDateFormatChange(e, index)}
            >
              <option value="US">US</option>
              <option value="UK">UK</option>
            </select>
            <p>|</p>
            <input
              id={`customDateInput_${index}`}
              type="date"
              value={customDates[index] || ""}
              onChange={(e) => handleCustomDateChange(e, index)}
            />
            <p>|</p>
            <input
              id={`grainyIntensityInput_${index}`}
              type="range"
              value={grainyIntensities[index] || "0"}
              onChange={(e) => handleGrainyIntensityChange(e, index)}
              min="0"
              max="50"
            />
            <p>Grain</p>
            <p>|</p>
            <input
              id={`colorAdjustmentIntensityInput_${index}`}
              type="range"
              value={colorAdjustmentIntensities[index] || "0"}
              onChange={(e) => handleColorAdjustmentIntensityChange(e, index)}
              min="0"
              max="100"
            />
            <p>Color</p>
          </div>
        ))}
    </div>
  );
};

export default ImagePreview;
