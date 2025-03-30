import React from "react";
import Button from "../../atoms/Button/Button";
import "./ActionButtons.css";

const ActionButtons = ({
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
    <div className="actions">
      <Button onClick={handleDelete} disabled={selectedAnnotation === null}>
        Delete Selected
      </Button>
      <Button onClick={handleClearAll} disabled={annotations.length === 0}>
        Clear All
      </Button>
      <Button
        onClick={handleCancelAnnotation}
        disabled={currentAnnotation.length === 0}
      >
        Cancel Current
      </Button>
      <Button onClick={exportAnnotations} disabled={annotations.length === 0}>
        Export JSON
      </Button>
      <Button onClick={exportAsImage} disabled={!image}>
        Export Image
      </Button>
    </div>
  );
};

export default ActionButtons;
