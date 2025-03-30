import React from "react";
import "./DragDropArea.css";

const DragDropArea = ({ onDragOver, onDrop }) => {
  return (
    <div className="drag-drop-area" onDragOver={onDragOver} onDrop={onDrop}>
      or Drag & Drop Image
    </div>
  );
};

export default DragDropArea;
