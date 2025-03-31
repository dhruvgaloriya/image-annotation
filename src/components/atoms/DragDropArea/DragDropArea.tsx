import React from "react";
import "./DragDropArea.css";

interface DragDropAreaProps {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  error?: string | null;
  clearError: () => void;
}

/**
 * Component for drag and drop functionality
 * @param onDragOver - Handler for drag over event
 * @param onDrop - Handler for drop event
 */
const DragDropArea: React.FC<DragDropAreaProps> = ({
  onDragOver,
  onDrop,
  error,
  clearError,
}) => {
  return (
    <div className="drag-drop-area-container">
      <div
        className={`drag-drop-area ${error ? "drag-drop-area--error" : ""}`}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={clearError}
      >
        or Drag & Drop Image
      </div>
      {error && <div className="drag-drop-error">{error}</div>}
    </div>
  );
};

export default DragDropArea;
