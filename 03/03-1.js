import * as fs from "fs";

const rawText = fs.readFileSync(
  new URL("./03-1.input.txt", import.meta.url),
  "utf8"
);

// get rows
const values = rawText.split(/\r?\n/);
console.log("length", values.length);

// clean data
const cleanedValues = values
  .map((value) => value.trim())
  .filter((value) => !!value);

const sumsOfOnesAndZeros = cleanedValues.reduce(
  ({ zeros, ones }, value) => {
    const bits = value.split("");
    return {
      zeros: bits
        .map((bit) => bit === "0")
        .map((bit, i) => bit + (zeros[i] ?? 0)),
      ones: bits
        .map((bit) => bit === "1")
        .map((bit, i) => bit + (ones[i] ?? 0)),
    };
  },
  { zeros: [], ones: [] }
);

console.log(sumsOfOnesAndZeros);

const gammaArr = sumsOfOnesAndZeros.zeros.map((numZeros, i) =>
  numZeros > sumsOfOnesAndZeros.ones[i] ? 0 : 1
);
const epsilonArr = sumsOfOnesAndZeros.zeros.map((numZeros, i) =>
  numZeros < sumsOfOnesAndZeros.ones[i] ? 0 : 1
);

console.log("gamma", gammaArr, "epsilon", epsilonArr);

const gamma = parseInt(gammaArr.join(""), 2);
const epsilon = parseInt(epsilonArr.join(""), 2);
console.log("gamma", gamma, "epsilon", epsilon);

const result = gamma * epsilon;
console.log(result);
