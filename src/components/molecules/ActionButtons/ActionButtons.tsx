import Button from "@/components/atoms/Button/Button";
import React from "react";
import "./ActionButtons.css";

interface ActionButtonsProps {
  handleDelete: () => void;
  selectedAnnotation: number | null;
  annotations: any[];
  handleClearAll: () => void;
  currentAnnotation: any[];
  handleCancelAnnotation: () => void;
  exportAnnotations: () => void;
  exportAsImage: () => void;
  image: string | null;
}

/**
 * Collection of action buttons for annotation operations
 * @param handleDelete - Handler for deleting selected annotation
 * @param selectedAnnotation - Index of currently selected annotation
 * @param annotations - Array of all annotations
 * @param handleClearAll - Handler for clearing all annotations
 * @param currentAnnotation - Currently being drawn annotation
 * @param handleCancelAnnotation - Handler for canceling current annotation
 * @param exportAnnotations - Handler for exporting annotations as JSON
 * @param exportAsImage - Handler for exporting canvas as image
 * @param image - Current image source
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
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
