import React from "react";
import "./DragDropArea.css";

interface DragDropAreaProps {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

/**
 * Component for drag and drop functionality
 * @param onDragOver - Handler for drag over event
 * @param onDrop - Handler for drop event
 */
const DragDropArea: React.FC<DragDropAreaProps> = ({ onDragOver, onDrop }) => {
  return (
    <div className="drag-drop-area" onDragOver={onDragOver} onDrop={onDrop}>
      or Drag & Drop Image
    </div>
  );
};

export default DragDropArea;
