import CanvasArea from "@/components/organisms/CanvasArea/CanvasArea";
import StatusBar from "@/components/organisms/StatusBar/StatusBar";
import Toolbar from "@/components/organisms/Toolbar/Toolbar";
import React from "react";
import "./MainLayout.css";

interface MainLayoutProps {
  image: string | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  handleCanvasClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  mode: "polygon" | "arrow";
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  setMode: (mode: "polygon" | "arrow") => void;
  handleDelete: () => void;
  selectedAnnotation: number | null;
  annotations: any[];
  handleClearAll: () => void;
  currentAnnotation: any[];
  handleCancelAnnotation: () => void;
  exportAnnotations: () => void;
  exportAsImage: () => void;
  error: string | null;
  clearError: () => void;
}

/**
 * Main application layout component
 * @param props - All props needed for the main layout including handlers and state
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  image,
  canvasRef,
  handleCanvasClick,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  mode,
  handleImageUpload,
  handleDragOver,
  handleDrop,
  setMode,
  handleDelete,
  selectedAnnotation,
  annotations,
  handleClearAll,
  currentAnnotation,
  handleCancelAnnotation,
  exportAnnotations,
  exportAsImage,
  error,
  clearError,
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
        handleDelete={handleDelete}
        selectedAnnotation={selectedAnnotation}
        annotations={annotations}
        handleClearAll={handleClearAll}
        currentAnnotation={currentAnnotation}
        handleCancelAnnotation={handleCancelAnnotation}
        exportAnnotations={exportAnnotations}
        exportAsImage={exportAsImage}
        image={image}
        error={error}
        clearError={clearError}
      />

      <div className="instructions">
        {mode === "polygon" ? (
          <p>
            <strong>Polygon Mode:</strong> Click to place points. Complete the
            polygon by clicking near the starting point. Click on a point or
            polygon to select and move it.
          </p>
        ) : (
          <p>
            <strong>Arrow Mode:</strong> Click to set the start point, then
            click again to set the end point. Click on an arrow or its endpoints
            to select and move it.
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

      <StatusBar annotations={annotations} />
    </div>
  );
};

export default MainLayout;
