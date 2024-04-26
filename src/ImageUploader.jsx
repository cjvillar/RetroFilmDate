import React from "react";

const ImageUploader = ({ onUpload }) => {
  return (
    <div>
      <label htmlFor="imageInput" className="btn">
        2. Upload JPEG
      </label>
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

