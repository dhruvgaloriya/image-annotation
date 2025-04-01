import { distanceToLine, isPointInPolygon } from "@/utils/annotationUtils";
import { useState } from "react";

export interface Point {
  x: number;
  y: number;
}

export interface Annotation {
  type: "polygon" | "arrow";
  points: Point[];
}

interface ClickResult {
  clicked: boolean;
  index: number;
  pointIndex?: number;
}

/**
 * Custom hook for managing annotation state and operations
 *
 * This hook provides functionality for:
 * - Creating and managing annotations (polygons and arrows)
 * - Selecting and manipulating existing annotations
 * - Checking for clicks on annotations
 * - Performing annotation operations (delete, clear, cancel)
 *
 * @returns Object containing annotation state and handlers
 */
const useAnnotation = () => {
  // Array of all completed annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  // Points for the annotation currently being drawn
  const [currentAnnotation, setCurrentAnnotation] = useState<Point[]>([]);

  // Index of the currently selected annotation
  const [selectedAnnotation, setSelectedAnnotation] = useState<number | null>(
    null
  );

  /**
   * Checks if a click occurred on an existing annotation
   * @param {number} x - X coordinate of the click
   * @param {number} y - Y coordinate of the click
   * @returns {ClickResult} Object indicating if and what was clicked
   */
  const checkClickOnAnnotation = (x: number, y: number): ClickResult => {
    for (let i = 0; i < annotations.length; i++) {
      const annotation = annotations[i];

      if (annotation.type === "polygon") {
        // Check if click was on a polygon point
        for (let j = 0; j < annotation.points.length; j++) {
          const point = annotation.points[j];
          if (Math.abs(x - point.x) < 10 && Math.abs(y - point.y) < 10) {
            return { clicked: true, index: i, pointIndex: j };
          }
        }

        // Check if click was inside the polygon
        if (isPointInPolygon(x, y, annotation.points)) {
          return { clicked: true, index: i };
        }
      } else if (annotation.type === "arrow") {
        // Check if click was on an arrow point
        for (let j = 0; j < annotation.points.length; j++) {
          const point = annotation.points[j];
          if (Math.abs(x - point.x) < 10 && Math.abs(y - point.y) < 10) {
            return { clicked: true, index: i, pointIndex: j };
          }
        }

        // Check if click was near the arrow line
        const start = annotation.points[0];
        const end = annotation.points[1];
        const dist = distanceToLine(x, y, start.x, start.y, end.x, end.y);
        if (dist < 5) {
          return { clicked: true, index: i };
        }
      }
    }

    return { clicked: false, index: 0 };
  };

  /**
   * Deletes the currently selected annotation
   */
  const handleDelete = () => {
    if (selectedAnnotation !== null) {
      const newAnnotations = annotations.filter(
        (_, index) => index !== selectedAnnotation
      );
      setAnnotations(newAnnotations);
      setSelectedAnnotation(null);
    }
  };

  /**
   * Clears all annotations and resets drawing state
   */
  const handleClearAll = () => {
    setAnnotations([]);
    setCurrentAnnotation([]);
    setSelectedAnnotation(null);
  };

  /**
   * Cancels the current annotation being drawn
   */
  const handleCancelAnnotation = () => {
    setCurrentAnnotation([]);
  };

  return {
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
  };
};

export default useAnnotation;
