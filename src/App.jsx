import React, { useState, useEffect } from "react";
import "./index.css";
import { handleImageUpload } from "./utils.js";
import ImageUploader from "./ImageUploader.jsx";
import ImagePreview from "./ImagePreview.jsx";
import ExampleImage from "./ExampleImage.jsx";
import Header from "./Header";

const App = () => {
  const [modifiedImages, setModifiedImages] = useState([]);

  const handleUpload = async (event) => {
    await handleImageUpload(event, modifiedImages, setModifiedImages);
  };

  return (
    <div className="app">
      <Header />
      <ImageUploader onUpload={handleUpload} />
      {modifiedImages.length === 0 && <ExampleImage />}
      <ImagePreview modifiedImage={modifiedImages} />
    </div>
  );
};

export default App;
