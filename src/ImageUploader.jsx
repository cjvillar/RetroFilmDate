import React from "react";

const ImageUploader = ({ onUpload }) => {
  return (
    <div>
      <h3>Upload jpeg files: </h3>
      {/* <label htmlFor="imageInput" className="btn">
        Upload jpeg files:
      </label> */}
      <div></div>
      <input
        type="file"
        id="imageInput"
        accept="image/jpeg, image/jpg, image/JPG"
        multiple
        onChange={onUpload}
      />
    </div>
  );
};

export default ImageUploader;
