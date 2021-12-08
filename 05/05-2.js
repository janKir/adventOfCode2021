import * as fs from "fs";
import { Line } from "./Line.js";
import { boundaryOfLines, createMatrixFromBoundary } from "./utils.js";

const rawText = fs.readFileSync(
  new URL("./05.input.txt", import.meta.url),
  "utf8"
);

// get rows
const rawLines = rawText
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => !!line);

const lines = rawLines.map((line) => Line.parseFromLine(line));
console.log(lines.length, lines[0]);

const allLines = lines;
console.log(allLines.length);

const boundary = boundaryOfLines(allLines);
console.log("boundary", boundary);

const matrix = createMatrixFromBoundary(boundary);
console.log("matrix size", matrix.length, matrix[0].length);

allLines.forEach((line) => {
  const pointsInLine = line.getPointsInLine();
  pointsInLine.forEach(([x, y]) => {
    try {
      matrix[y][x] += 1;
    } catch (err) {
      console.log("error", x, y, line, pointsInLine, pointsInLine.length);
      console.log(matrix[y]);
      throw err;
    }
  });
});

const amountOfValues = matrix.reduce((amounts, row) => {
  return row.reduce((_amounts, value) => {
    if (!_amounts[value]) {
      _amounts[value] = 0;
    }
    _amounts[value] += 1;
    return _amounts;
  }, amounts);
}, {});

console.log("amounts", amountOfValues);

const amountOfCellsWithValueGreaterEqual2 = Object.entries(
  amountOfValues
).reduce((sum, [key, value]) => {
  if (key >= 2) {
    return sum + value;
  }
  return sum;
}, 0);
console.log(amountOfCellsWithValueGreaterEqual2);
