/**
 * Converts page coordinates to image coordinates
 * @param e - Mouse event
 * @param canvas - Canvas element
 * @returns Object with x and y coordinates in image space
 */
export const pageToImageCoords = (
  e: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement | null
): { x: number; y: number } => {
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
};
