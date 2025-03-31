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
 * Custom hook for canvas operations and drawing
 * @param props - Canvas properties and handlers
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
    const { x, y } = pageToImageCoords(e, canvasRef.current);
    const clickedOnAnnotation = checkClickOnAnnotation(x, y);
    if (
      clickedOnAnnotation.clicked &&
      clickedOnAnnotation.index !== undefined
    ) {
      setSelectedAnnotation(clickedOnAnnotation.index);
      return;
    }

    if (mode === "polygon") {
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
        setCurrentAnnotation([...currentAnnotation, { x, y }]);
      }
    } else if (mode === "arrow") {
      if (currentAnnotation.length === 0) {
        setCurrentAnnotation([{ x, y }]);
      } else if (currentAnnotation.length === 1) {
        const newArrow: Annotation = {
          type: "arrow",
          points: [currentAnnotation[0], { x, y }],
        };
        setAnnotations([...annotations, newArrow]);
        setCurrentAnnotation([]);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!image) return;
    const { x, y } = pageToImageCoords(e, canvasRef.current);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const { x, y } = pageToImageCoords(e, canvasRef.current);

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

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedPointIndex(null);
    setDraggedAnnotationIndex(null);
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

    console.log(JSON.stringify(exportData, null, 2));
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

  useEffect(() => {
    if (!canvasRef.current || !image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      throw new Error("Failed to get 2D context");
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    }

    annotations.forEach((annotation, index) => {
      const isSelected = index === selectedAnnotation;

      if (annotation.type === "polygon") {
        ctx?.beginPath();
        ctx?.moveTo(annotation.points[0].x, annotation.points[0].y);

        for (let i = 1; i < annotation.points.length; i++) {
          ctx?.lineTo(annotation.points[i].x, annotation.points[i].y);
        }

        ctx.closePath();
        ctx.fillStyle = isSelected
          ? "rgba(255, 0, 0, 0.2)"
          : "rgba(0, 255, 0, 0.2)";
        ctx.fill();
        ctx.strokeStyle = isSelected ? "red" : "green";
        ctx.lineWidth = 3;
        ctx.stroke();

        annotation.points.forEach((point: { x: number; y: number }) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? "red" : "green";
          ctx.fill();
        });
      } else if (annotation.type === "arrow") {
        const start = annotation.points[0];
        const end = annotation.points[1];

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = isSelected ? "red" : "blue";
        ctx.lineWidth = 3;
        ctx.stroke();

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

    if (currentAnnotation.length > 0) {
      if (mode === "polygon") {
        ctx.beginPath();
        ctx.moveTo(currentAnnotation[0].x, currentAnnotation[0].y);

        for (let i = 1; i < currentAnnotation.length; i++) {
          ctx.lineTo(currentAnnotation[i].x, currentAnnotation[i].y);
        }

        if (currentAnnotation.length > 0 && isDragging) {
          ctx.lineTo(
            currentAnnotation[currentAnnotation.length - 1].x,
            currentAnnotation[currentAnnotation.length - 1].y
          );
        }

        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 4;
        ctx.stroke();

        currentAnnotation.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "yellow";
          ctx.fill();
        });
      } else if (mode === "arrow" && currentAnnotation.length === 1) {
        const start = currentAnnotation[0];
        const end = { x: start.x + 50, y: start.y + 50 };

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(start.x, start.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
      }
    }
  }, [image, annotations, currentAnnotation, selectedAnnotation, isDragging]);

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
    handleMouseUp,
    exportAnnotations,
    exportAsImage,
  };
};

export default useCanvas;
