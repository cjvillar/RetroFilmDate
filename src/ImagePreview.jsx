import React from "react";
import "./index.css";

const ImagePreview = ({ modifiedImage }) => {
  if (!Array.isArray(modifiedImage) || modifiedImage.length === 0) {
    return <img src={modifiedImage} alt="Preview" />; // render example
  }

  const handleDownload = (imageUrl, originalName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = `stamped_${originalName}`;
    downloadLink.click();
  };

  return (
    <div>
      <h3>Image Preview</h3>
      {modifiedImage.map((imageUrl, index) => (
        <div key={index}>
          <img
            src={imageUrl}
            alt={`Preview ${index}`}
            style={{ width: "100%", margin: "30px" }}
          />
          <button
            onClick={() => handleDownload(imageUrl, `image_${index}.jpg`)}
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;

