import React from "react";
import MainLayout from "./components/templates/MainLayout/MainLayout";
import useAnnotation from "./hooks/useAnnotation";
import useCanvas from "./hooks/useCanvas";
import useHistory from "./hooks/useHistory";
import useImage from "./hooks/useImage";

function App() {
  // Image handling (upload, drag/drop, dimensions)
  const {
    image,
    imageRef,
    imageSize,
    handleImageUpload,
    handleDragOver,
    handleDrop,
  } = useImage();

  // Annotation state and actions
  const {
    annotations,
    setAnnotations,
    currentAnnotation,
    setCurrentAnnotation,
    selectedAnnotation,
    setSelectedAnnotation,
    checkClickOnAnnotation,
    handleDelete,
    handleClearAll,
    handleCancelAnnotation,
  } = useAnnotation();

  // Undo/Redo functionality
  const { history, historyIndex, handleUndo, handleRedo } = useHistory(
    annotations,
    setAnnotations,
    setSelectedAnnotation
  );

  // Canvas drawing and interaction
  const {
    mode,
    setMode,
    canvasRef,
    handleCanvasClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    exportAnnotations,
    exportAsImage,
  } = useCanvas({
    image,
    annotations,
    setAnnotations,
    currentAnnotation,
    setCurrentAnnotation,
    selectedAnnotation,
    setSelectedAnnotation,
    checkClickOnAnnotation,
    imageSize,
  });

  return (
    <MainLayout
      image={image}
      canvasRef={canvasRef}
      imageRef={imageRef}
      handleCanvasClick={handleCanvasClick}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      handleMouseUp={handleMouseUp}
      mode={mode}
      handleImageUpload={handleImageUpload}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      setMode={setMode}
      handleUndo={handleUndo}
      handleRedo={handleRedo}
      historyIndex={historyIndex}
      history={history}
      handleDelete={handleDelete}
      selectedAnnotation={selectedAnnotation}
      annotations={annotations}
      handleClearAll={handleClearAll}
      currentAnnotation={currentAnnotation}
      handleCancelAnnotation={handleCancelAnnotation}
      exportAnnotations={exportAnnotations}
      exportAsImage={exportAsImage}
    />
  );
}

export default App;
