export function range(start, end) {
  const min = parseInt(start, 10);
  const max = parseInt(end, 10);
  const length = Math.abs(max - min) + 1;
  const step = min > max ? -1 : 1;
  return Array(length)
    .fill(min)
    .map((x, i) => x + i * step);
}

export function parseLine(line) {
  const [p1Raw, p2Raw] = line.trim().split(" -> ");
  const p1 = p1Raw.split(",");
  const p2 = p2Raw.split(",");

  return [p1, p2];
}

export function boundaryOfLines(lines) {
  return lines.reduce(
    (prevBoundary, line) => {
      return {
        minX: Math.min(
          prevBoundary.minX ?? Number.POSITIVE_INFINITY,
          line.x1,
          line.x2
        ),
        minY: Math.min(
          prevBoundary.minY ?? Number.POSITIVE_INFINITY,
          line.y1,
          line.y2
        ),
        maxX: Math.max(
          prevBoundary.maxX ?? Number.NEGATIVE_INFINITY,
          line.x1,
          line.x2
        ),
        maxY: Math.max(
          prevBoundary.maxY ?? Number.NEGATIVE_INFINITY,
          line.y1,
          line.y2
        ),
      };
    },
    {
      minX: undefined,
      minY: undefined,
      maxX: undefined,
      maxY: undefined,
    }
  );
}

export function createMatrixFromBoundary(boundary) {
  return Array(boundary.maxY + 1)
    .fill(null)
    .map(() => Array(boundary.maxX + 1).fill(0));
}
