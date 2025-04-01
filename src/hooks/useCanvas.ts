import { Annotation, Point } from "@/hooks/useAnnotation";
import { pageToImageCoords } from "@/utils/coordinateUtils";
import { useEffect, useRef, useState } from "react";

interface UseCanvasProps {
  image: string | null;
  annotations: Annotation[];
  setAnnotations: (annotations: Annotation[]) => void;
  currentAnnotation: Point[];
  setCurrentAnnotation: (points: Point[]) => void;
  selectedAnnotation: number | null;
  setSelectedAnnotation: (index: number | null) => void;
  checkClickOnAnnotation: (
    x: number,
    y: number
  ) => {
    clicked: boolean;
    index: number;
    pointIndex?: number;
  };
  imageSize: { width: number; height: number };
}

/**
 * Custom hook for managing canvas operations and drawing
 *
 * This hook provides functionality for:
 * - Handling mouse/touch interactions with the canvas
 * - Drawing annotations on the canvas
 * - Managing drawing modes (polygon/arrow)
 * - Exporting annotations and images
 * - Handling image display on the canvas
 *
 * @param {UseCanvasProps} props - Required properties including image and annotation states
 * @returns Object containing canvas state and handlers
 */
const useCanvas = ({
  image,
  annotations,
  setAnnotations,
  currentAnnotation,
  setCurrentAnnotation,
  selectedAnnotation,
  setSelectedAnnotation,
  checkClickOnAnnotation,
  imageSize,
}: UseCanvasProps) => {
  const [mode, setMode] = useState<"polygon" | "arrow">("polygon");
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPointIndex, setDraggedPointIndex] = useState<number | null>(
    null
  );
  const [draggedAnnotationIndex, setDraggedAnnotationIndex] = useState<
    number | null
  >(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!image || !canvasRef.current) return;
    // Convert screen coordinates to image coordinates
    const { x, y } = pageToImageCoords(e, canvasRef.current);

    // Check if click was on existing annotation
    const clickedOnAnnotation = checkClickOnAnnotation(x, y);
    if (
      clickedOnAnnotation.clicked &&
      clickedOnAnnotation.index !== undefined
    ) {
      setSelectedAnnotation(clickedOnAnnotation.index);
      return;
    }

    // Handle polygon mode clicks
    if (mode === "polygon") {
      // If clicking near first point with enough points, complete the polygon
      if (
        currentAnnotation.length > 2 &&
        Math.abs(x - currentAnnotation[0].x) < 10 &&
        Math.abs(y - currentAnnotation[0].y) < 10
      ) {
        setAnnotations([
          ...annotations,
          { type: "polygon", points: [...currentAnnotation] },
        ]);
        setCurrentAnnotation([]);
      } else {
        // Add new point to current polygon
        setCurrentAnnotation([...currentAnnotation, { x, y }]);
      }
    }
    // Handle arrow mode clicks
    else if (mode === "arrow") {
      if (currentAnnotation.length === 0) {
        // Set starting point for arrow
        setCurrentAnnotation([{ x, y }]);
      } else if (currentAnnotation.length === 1) {
        // Complete the arrow with end point
        const newArrow: Annotation = {
          type: "arrow",
          points: [currentAnnotation[0], { x, y }],
        };
        setAnnotations([...annotations, newArrow]);
        setCurrentAnnotation([]);
      }
    }
  };

  // Convert touch event to mouse-like event
  const getTouchCoordinates = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const touch = e.touches[0];
    const mouseEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY,
    } as React.MouseEvent<HTMLCanvasElement>;
    return pageToImageCoords(mouseEvent, canvasRef.current);
  };

  const downCoordinate = (x: number, y: number) => {
    const clickResult = checkClickOnAnnotation(x, y);
    if (clickResult.clicked) {
      setIsDragging(true);
      setSelectedAnnotation(clickResult.index);

      if (clickResult.pointIndex !== undefined) {
        setDraggedPointIndex(clickResult.pointIndex);
        setDraggedAnnotationIndex(clickResult.index);
      } else {
        setDraggedAnnotationIndex(clickResult.index);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!image) return;
    const { x, y } = pageToImageCoords(e, canvasRef.current);
    downCoordinate(x, y);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!image) return;
    const { x, y } = getTouchCoordinates(e);
    downCoordinate(x, y);
  };

  const moveCoordinate = (x: number, y: number) => {
    if (draggedPointIndex !== null && draggedAnnotationIndex !== null) {
      const newAnnotations = [...annotations];
      newAnnotations[draggedAnnotationIndex].points[draggedPointIndex] = {
        x,
        y,
      };
      setAnnotations(newAnnotations);
    } else if (draggedAnnotationIndex !== null) {
      const newAnnotations = [...annotations];
      const annotation = newAnnotations[draggedAnnotationIndex];

      if (annotation.type === "polygon") {
        const oldCenterX =
          annotation.points.reduce((sum: number, p: Point) => sum + p.x, 0) /
          annotation.points.length;
        const oldCenterY =
          annotation.points.reduce((sum: number, p: Point) => sum + p.y, 0) /
          annotation.points.length;

        const deltaX = x - oldCenterX;
        const deltaY = y - oldCenterY;

        annotation.points = annotation.points.map((point: Point) => ({
          x: point.x + deltaX,
          y: point.y + deltaY,
        }));
      } else if (annotation.type === "arrow") {
        const midX = (annotation.points[0].x + annotation.points[1].x) / 2;
        const midY = (annotation.points[0].y + annotation.points[1].y) / 2;

        const deltaX = x - midX;
        const deltaY = y - midY;

        annotation.points = annotation.points.map((point: Point) => ({
          x: point.x + deltaX,
          y: point.y + deltaY,
        }));
      }

      setAnnotations(newAnnotations);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const { x, y } = pageToImageCoords(e, canvasRef.current);
    moveCoordinate(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDragging) return;
    const { x, y } = getTouchCoordinates(e);
    moveCoordinate(x, y);
  };

  const endDragging = () => {
    setIsDragging(false);
    setDraggedPointIndex(null);
    setDraggedAnnotationIndex(null);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    endDragging();
  };

  const handleMouseUp = () => {
    endDragging();
  };

  const exportAnnotations = () => {
    if (annotations.length === 0) {
      alert("No annotations to export");
      return;
    }

    const exportData = annotations.map((annotation) => ({
      type: annotation.type,
      points: annotation.points.map((point: Point) => ({
        x: point.x / imageSize.width,
        y: point.y / imageSize.height,
      })),
    }));
    const dataStr = JSON.stringify(exportData, null, 2);
    console.log("annotations", dataStr);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportLink = document.createElement("a");
    exportLink.setAttribute("href", dataUri);
    exportLink.setAttribute("download", "annotations.json");
    document.body.appendChild(exportLink);
    exportLink.click();
    document.body.removeChild(exportLink);
  };

  const exportAsImage = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    const exportLink = document.createElement("a");
    exportLink.setAttribute("href", dataUrl);
    exportLink.setAttribute("download", "annotated_image.png");
    document.body.appendChild(exportLink);
    exportLink.click();
    document.body.removeChild(exportLink);
  };

  /**
   * Effect for drawing on the canvas whenever relevant state changes
   */
  useEffect(() => {
    if (!canvasRef.current || !image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      throw new Error("Failed to get 2D context");
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background image if loaded
    if (imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    }

    // Draw all completed annotations
    annotations.forEach((annotation, index) => {
      const isSelected = index === selectedAnnotation;

      if (annotation.type === "polygon") {
        // Draw polygon
        ctx?.beginPath();
        ctx?.moveTo(annotation.points[0].x, annotation.points[0].y);

        for (let i = 1; i < annotation.points.length; i++) {
          ctx?.lineTo(annotation.points[i].x, annotation.points[i].y);
        }

        ctx.closePath();

        // Fill and stroke polygon
        ctx.fillStyle = isSelected
          ? "rgba(255, 0, 0, 0.2)"
          : "rgba(0, 255, 0, 0.2)";
        ctx.fill();
        ctx.strokeStyle = isSelected ? "red" : "green";
        ctx.lineWidth = 6;
        ctx.stroke();

        // Draw polygon vertices
        annotation.points.forEach((point: { x: number; y: number }) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? "red" : "green";
          ctx.fill();
        });
      } else if (annotation.type === "arrow") {
        // Draw arrow line
        const start = annotation.points[0];
        const end = annotation.points[1];

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = isSelected ? "red" : "blue";
        ctx.lineWidth = 6;
        ctx.stroke();

        // Draw arrow head
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const headLength = 15;

        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(
          end.x - headLength * Math.cos(angle - Math.PI / 6),
          end.y - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          end.x - headLength * Math.cos(angle + Math.PI / 6),
          end.y - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fillStyle = isSelected ? "red" : "blue";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(start.x, start.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "red" : "blue";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(end.x, end.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "red" : "blue";
        ctx.fill();
      }
    });

    // Draw the current annotation being created
    if (currentAnnotation.length > 0) {
      if (mode === "polygon") {
        // Draw current polygon points
        ctx.beginPath();
        ctx.moveTo(currentAnnotation[0].x, currentAnnotation[0].y);

        for (let i = 1; i < currentAnnotation.length; i++) {
          ctx.lineTo(currentAnnotation[i].x, currentAnnotation[i].y);
        }

        // Draw preview line to mouse position if dragging
        if (currentAnnotation.length > 0 && isDragging) {
          ctx.lineTo(
            currentAnnotation[currentAnnotation.length - 1].x,
            currentAnnotation[currentAnnotation.length - 1].y
          );
        }

        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 6;
        ctx.stroke();

        // Draw current polygon vertices
        currentAnnotation.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "yellow";
          ctx.fill();
        });
      } else if (mode === "arrow" && currentAnnotation.length === 1) {
        const start = currentAnnotation[0];
        const end = { x: start.x + 50, y: start.y + 50 };

        // Draw preview arrow
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
        ctx.lineWidth = 6;
        ctx.stroke();

        // Draw starting point
        ctx.beginPath();
        ctx.arc(start.x, start.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
      }
    }
  }, [image, annotations, currentAnnotation, selectedAnnotation, isDragging]);

  /**
   * Effect for loading and displaying the image on the canvas
   */
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        imageRef.current = img;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };
    img.src = image;
  }, [image]);

  return {
    mode,
    setMode,
    canvasRef,
    handleCanvasClick,
    handleMouseDown,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseUp,
    exportAnnotations,
    exportAsImage,
  };
};

export default useCanvas;
