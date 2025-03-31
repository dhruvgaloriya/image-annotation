import React from "react";
import "./CanvasArea.css";

interface CanvasAreaProps {
  image: string | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  handleCanvasClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleTouchStart: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  handleTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  handleTouchEnd: (e: React.TouchEvent<HTMLCanvasElement>) => void;
}

/**
 * Canvas component for displaying and annotating images
 * @param image - Image source to display
 * @param canvasRef - Reference to the canvas element
 * @param handleCanvasClick - Click handler for canvas
 * @param handleMouseDown - Mouse down handler for canvas
 * @param handleMouseMove - Mouse move handler for canvas
 * @param handleMouseUp - Mouse up handler for canvas
 */
const CanvasArea: React.FC<CanvasAreaProps> = ({
  image,
  canvasRef,
  handleCanvasClick,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
