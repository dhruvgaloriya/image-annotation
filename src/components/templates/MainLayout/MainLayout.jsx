import React from "react";
import Toolbar from "../../organisms/Toolbar/Toolbar";
import CanvasArea from "../../organisms/CanvasArea/CanvasArea";
import StatusBar from "../../organisms/StatusBar/StatusBar";
import "./MainLayout.css";

const MainLayout = ({
  image,
  canvasRef,
  imageRef,
  handleCanvasClick,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  mode,
  handleImageUpload,
  handleDragOver,
  handleDrop,
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
}) => {
  return (
    <div className="app">
      <div className="header">
        <h1>Image Annotation Tool</h1>
      </div>

      <Toolbar
        handleImageUpload={handleImageUpload}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        mode={mode}
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
        image={image}
      />

      <div className="instructions">
        {mode === "polygon" ? (
          <p>
            <strong>Polygon Mode:</strong> Click to place points. Complete the
            polygon by clicking near the starting point. Click on a point or
            polygon to select and move it. Use Undo/Redo to fix mistakes.
          </p>
        ) : (
          <p>
            <strong>Arrow Mode:</strong> Click to set the start point, then
            click again to set the end point. Click on an arrow or its endpoints
            to select and move it. Use Undo/Redo to fix mistakes.
          </p>
        )}
      </div>

      <CanvasArea
        image={image}
        canvasRef={canvasRef}
        handleCanvasClick={handleCanvasClick}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
      />

      <StatusBar
        historyIndex={historyIndex}
        history={history}
        annotations={annotations}
      />
    </div>
  );
};

export default MainLayout;
