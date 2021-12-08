import * as fs from "fs";
import { Fish } from "./Fish.js";

const rawText = fs
  .readFileSync(new URL("./06.input.txt", import.meta.url), "utf8")
  .trim();

const initialTimers = rawText.split(",");
// const initialPopulation = initialTimers.map(
//   (value) => new Fish(parseInt(value))
// );
// console.log(initialPopulation);

function amountsFromPopulationList(population) {
  return population.reduce((amounts, fishTimer) => {
    return {
      ...amounts,
      [fishTimer]: (amounts[fishTimer] ?? 0) + 1,
    };
  }, {});
}
const initialAmounts = amountsFromPopulationList(initialTimers);
console.log(initialAmounts);

function evolvePopulationByOneDay(populationAmounts) {
  return Object.entries(populationAmounts).reduce(
    (amounts, [timer, amount]) => {
      const numericTimer = parseInt(timer);
      const nextTimer = numericTimer <= 0 ? 6 : numericTimer - 1;
      // console.log(numericTimer, amount, numericTimer === 0, nextTimer);
      return {
        ...amounts,
        [nextTimer]: amount + (amounts[nextTimer] ?? 0),
        // 8: numericTimer === 0 ? amount : amounts["0"] ?? 0,
        ...(numericTimer === 0 ? { 8: amount } : {}),
      };
    },
    {}
  );
}

function evolvePopulationByXDays(initialPopulationAmounts, days, overallDays) {
  const _overallDays = overallDays ?? days;
  console.log(
    _overallDays - days,
    totalOfIndividuals(initialPopulationAmounts),
    initialPopulationAmounts
  );
  if (days <= 0) {
    return initialPopulationAmounts;
  }
  const evolvedPopulationAmounts = evolvePopulationByOneDay(
    initialPopulationAmounts
  );
  return evolvePopulationByXDays(
    evolvedPopulationAmounts,
    days - 1,
    _overallDays
  );
}

function totalOfIndividuals(populationAmounts) {
  return Object.values(populationAmounts).reduce(
    (sum, amount) => sum + amount,
    0
  );
}

const amountsAfter80Days = evolvePopulationByXDays(initialAmounts, 80);
console.log(
  "after 80 days",
  totalOfIndividuals(amountsAfter80Days),
  amountsAfter80Days
);

// PART 2
const amountsAfter256Days = evolvePopulationByXDays(initialAmounts, 256);
console.log(
  "after 256 days",
  totalOfIndividuals(amountsAfter256Days),
  amountsAfter256Days
);

// the following methods produce such large arrays that the heap overflows
// function evolvePopulationOneDay(population) {
//   const newborns = [];
//   const evolvedFish = population.map((fish) =>
//     fish.evolveOneDay((newborn) => newborns.push(newborn))
//   );
//   return [...evolvedFish, ...newborns];
// }

// function evolvePopulationByXDays(initialPopulation, days) {
//   console.log(80 - days, initialPopulation.length);
//   if (days <= 0) {
//     return initialPopulation;
//   }
//   const evolvedPopulation = evolvePopulationOneDay(initialPopulation);
//   return evolvePopulationByXDays(evolvedPopulation, days - 1);
// }

// const evolvedFish = evolvePopulationByXDays(initialPopulation, 80);
// console.log(evolvedFish.length);
