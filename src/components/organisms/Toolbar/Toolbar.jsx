import React from "react";
import DragDropArea from "../../atoms/DragDropArea/DragDropArea";
import FileInput from "../../atoms/FileInput/FileInput";
import ActionButtons from "../../molecules/ActionButtons/ActionButtons";
import ModeSelector from "../../molecules/ModeSelector/ModeSelector";
import "./Toolbar.css";

const Toolbar = ({
  handleImageUpload,
  handleDragOver,
  handleDrop,
  mode,
  setMode,
  handleDelete,
  selectedAnnotation,
  annotations,
  handleClearAll,
  currentAnnotation,
  handleCancelAnnotation,
  exportAnnotations,
  exportAsImage,
  image,
}) => {
  return (
    <div className="toolbar">
      <div className="upload-area">
        <FileInput handleImageUpload={handleImageUpload} />
        <DragDropArea onDragOver={handleDragOver} onDrop={handleDrop} />
      </div>

      <ModeSelector mode={mode} setMode={setMode} />
      <ActionButtons
        handleDelete={handleDelete}
        selectedAnnotation={selectedAnnotation}
        annotations={annotations}
        handleClearAll={handleClearAll}
        currentAnnotation={currentAnnotation}
        handleCancelAnnotation={handleCancelAnnotation}
        exportAnnotations={exportAnnotations}
        exportAsImage={exportAsImage}
        image={image}
      />
    </div>
  );
};

export default Toolbar;
