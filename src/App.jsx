import React, { useState, useEffect } from "react";
import "./index.css";
import { addTimestamp, handleImageUpload } from "./utils.js";
import ImageUploader from "./ImageUploader.jsx";
import ImagePreview from "./ImagePreview.jsx";
import example from "./assets/example.png";

const App = () => {
  const [modifiedImages, setModifiedImages] = useState([]);

  const handleUpload = async (event) => {
    await handleImageUpload(event, modifiedImages, setModifiedImages);
  };

  // useEffect(() => {
  //   async function addTimestampAndSetModifiedImage() {
  //     const blob = await fetch(example).then((res) => res.blob());
  //     const timestampedExample = await addTimestamp(blob);
  //     setModifiedImages(timestampedExample);
  //   }
  //   addTimestampAndSetModifiedImage();
  // }, []);

  // useEffect(() => {
  //   async function addTimestampAndSetModifiedImage() {
  //     const timestampedExample = await addTimestamp();
  //     setModifiedImages(timestampedExample);
  //   }
  //   addTimestampAndSetModifiedImage();
  // }, []);

  return (
    <div className="app">
      <h1 className="">Retro Date Stamp</h1>
      <ImageUploader onUpload={handleUpload} />
      <ImagePreview modifiedImage={modifiedImages} />
    </div>
  );
};

export default App;

App.js;
