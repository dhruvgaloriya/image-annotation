import React from "react";
import "./FileInput.css";

interface FileInputProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * File input component styled as a button
 * @param handleImageUpload - Handler for file input change event
 */
const FileInput: React.FC<FileInputProps> = ({ handleImageUpload }) => {
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
