import { useEffect, useState } from "react";
import { isPointInPolygon, distanceToLine } from "../utils/annotationUtils";

const useAnnotation = () => {
  const [annotations, setAnnotations] = useState([]);
  const [currentAnnotation, setCurrentAnnotation] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);

  useEffect(() => {
    if (annotations.length) {
      console.log("anonation", annotations);
    }
  }, [annotations]);

  const checkClickOnAnnotation = (x, y) => {
    for (let i = 0; i < annotations.length; i++) {
      const annotation = annotations[i];

      if (annotation.type === "polygon") {
        for (let j = 0; j < annotation.points.length; j++) {
          const point = annotation.points[j];
          if (Math.abs(x - point.x) < 10 && Math.abs(y - point.y) < 10) {
            return { clicked: true, index: i, pointIndex: j };
          }
        }

        if (isPointInPolygon(x, y, annotation.points)) {
          return { clicked: true, index: i };
        }
      } else if (annotation.type === "arrow") {
        for (let j = 0; j < annotation.points.length; j++) {
          const point = annotation.points[j];
          if (Math.abs(x - point.x) < 10 && Math.abs(y - point.y) < 10) {
            return { clicked: true, index: i, pointIndex: j };
          }
        }

        const start = annotation.points[0];
        const end = annotation.points[1];
        const dist = distanceToLine(x, y, start.x, start.y, end.x, end.y);
        if (dist < 5) {
          return { clicked: true, index: i };
        }
      }
    }

    return { clicked: false };
  };

  const handleDelete = () => {
    if (selectedAnnotation !== null) {
      const newAnnotations = annotations.filter(
        (_, index) => index !== selectedAnnotation
      );
      setAnnotations(newAnnotations);
      setSelectedAnnotation(null);
    }
  };

  const handleClearAll = () => {
    setAnnotations([]);
    setCurrentAnnotation([]);
    setSelectedAnnotation(null);
  };

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
