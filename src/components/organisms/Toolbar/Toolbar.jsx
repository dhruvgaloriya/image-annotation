import React from "react";
import FileInput from "../../atoms/FileInput/FileInput";
import DragDropArea from "../../atoms/DragDropArea/DragDropArea";
import ModeSelector from "../../molecules/ModeSelector/ModeSelector";
import HistoryControls from "../../molecules/HistoryControls/HistoryControls";
import ActionButtons from "../../molecules/ActionButtons/ActionButtons";
import "./Toolbar.css";

const Toolbar = ({
  handleImageUpload,
  handleDragOver,
  handleDrop,
  mode,
  setMode,
  handleUndo,
  handleRedo,
  historyIndex,
  history,
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

      <HistoryControls
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        historyIndex={historyIndex}
        history={history}
      />

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
