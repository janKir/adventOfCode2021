import * as fs from "fs";

const rawText = fs.readFileSync(
  new URL("./01-1.input.txt", import.meta.url),
  "utf8"
);
const values = rawText.split(/\r?\n/);
console.log("length", values.length);
const amountOfIncreasedValues = values
  .map((rawValue) => {
    try {
      return parseInt(rawValue, 10);
    } catch (e) {
      return undefined;
    }
  })
  .filter(
    (value, i, array) => value !== undefined && i > 0 && value > array[i - 1]
  ).length;

console.log(amountOfIncreasedValues);
