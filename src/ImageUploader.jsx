import React from "react";

const ImageUploader = ({ onUpload }) => {
  return (
    <div>
      <h3 className="upload">Upload jpeg files: </h3>

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
