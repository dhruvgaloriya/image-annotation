import React from "react";
import "./CanvasArea.css";

const CanvasArea = ({
  image,
  canvasRef,
  handleCanvasClick,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
}) => {
  return (
    <div className="canvas-container">
      {image ? (
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      ) : (
        <div className="no-image">
          <p>Upload an image to start annotating</p>
        </div>
      )}
    </div>
  );
};

export default CanvasArea;
