interface Point {
  x: number;
  y: number;
}

/**
 * Checks if a point is inside a polygon
 * @param x - X coordinate of point
 * @param y - Y coordinate of point
 * @param points - Array of polygon points
 * @returns Boolean indicating if point is inside polygon
 */
export const isPointInPolygon = (
  x: number,
  y: number,
  points: Point[]
): boolean => {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x;
    const yi = points[i].y;
    const xj = points[j].x;
    const yj = points[j].y;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

/**
 * Calculates distance from a point to a line segment
 * @param x - X coordinate of point
 * @param y - Y coordinate of point
 * @param x1 - X coordinate of line start
 * @param y1 - Y coordinate of line start
 * @param x2 - X coordinate of line end
 * @param y2 - Y coordinate of line end
 * @returns Distance from point to line
 */
export const distanceToLine = (
  x: number,
  y: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;

  if (len_sq !== 0) {
    param = dot / len_sq;
  }

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;

  return Math.sqrt(dx * dx + dy * dy);
};
