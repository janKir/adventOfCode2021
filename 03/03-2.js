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
console.log("length", cleanedValues.length);

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

function oxygenBitCriteria(index) {
  const criteriaValue =
    sumsOfOnesAndZeros.zeros[index] > sumsOfOnesAndZeros.ones[index]
      ? "0"
      : "1";
  return (bit) => bit === criteriaValue;
}

function co2BitCriteria(index) {
  const criteriaValue =
    sumsOfOnesAndZeros.ones[index] < sumsOfOnesAndZeros.zeros[index]
      ? "1"
      : "0";
  return (bit) => bit === criteriaValue;
}

function filterValues(values, criteriaFn, index) {
  if (values.length === 0) {
    throw new Error("values is an empty list");
  }
  if (values[0].length <= index) {
    throw new Error("index overflow", index, values[0]);
  }

  const filterCriteria = criteriaFn(index);
  const filteredValues = values.filter((value) =>
    filterCriteria(value.charAt(index))
  );
  // console.log(index, filteredValues);

  if (filteredValues.length > 1) {
    return filterValues(filteredValues, criteriaFn, index + 1);
  }
  return filteredValues;
}

const oxygenValueString = filterValues(cleanedValues, oxygenBitCriteria, 0);
const co2ValueString = filterValues(cleanedValues, co2BitCriteria, 0);

console.log({ oxygenValueString, co2ValueString });

const oxygenValue = parseInt(oxygenValueString, 2);
const co2Value = parseInt(co2ValueString, 2);

console.log({ oxygenValue, co2Value });

console.log(oxygenValue * co2Value);
