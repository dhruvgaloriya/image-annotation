import React from "react";
import "./FileInput.css";

const FileInput = ({ handleImageUpload }) => {
  return (
    <>
      <input
        type="file"
        id="imageUpload"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageUpload}
      />
      <label htmlFor="imageUpload" className="button">
        Upload Image
      </label>
    </>
  );
};

export default FileInput;
