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
    (value, i, array) =>
      value !== undefined &&
      i > 2 &&
      threeLastValuesSum(array, i) > threeLastValuesSum(array, i - 1)
  ).length;

console.log(amountOfIncreasedValues);

function threeLastValuesSum(array, i) {
  if (i < 2) throw new Error("cannot sum values in array for index below 2");

  return array[i - 2] + array[i - 1] + array[i];
}
