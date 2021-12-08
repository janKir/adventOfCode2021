import { parseLine, range } from "./utils.js";

export class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  static parseFromLine(line) {
    const [[x1, y1], [x2, y2]] = parseLine(line);
    return new Line(x1, y1, x2, y2);
  }

  isHorizontal() {
    return this.y1 === this.y2;
  }

  isVertical() {
    return this.x1 === this.x2;
  }

  getPointsInLine() {
    if (this.isHorizontal()) {
      return range(this.x1, this.x2).map((x) => [x, this.y1]);
    }
    if (this.isVertical()) {
      return range(this.y1, this.y2).map((y) => [this.x1, y]);
    }
    // otherwise always 45° diagonal
    const xRange = range(this.x1, this.x2);
    const yRange = range(this.y1, this.y2);
    if (xRange.length !== yRange.length)
      throw new Error("line is not 45° diagonal");

    return xRange.map((x, i) => [x, yRange[i]]);
  }
}
