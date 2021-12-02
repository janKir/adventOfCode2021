import * as fs from "fs";

const rawText = fs.readFileSync(
  new URL("./02-1.input.txt", import.meta.url),
  "utf8"
);
const values = rawText.split(/\r?\n/);
console.log("length", values.length);

const position = values.reduce(
  ({ depth, x }, row) => {
    try {
      const words = row.split(" ");
      if (words.length !== 2) {
        console.log(
          "skip row because has not 2 words but",
          words.length,
          "row: ",
          words
        );
        return { depth, x };
      }

      const command = words[0];
      const value = parseInt(words[1], 10);
      switch (command) {
        case "forward":
          return { depth, x: x + value };
        case "down":
          return { depth: depth + value, x };
        case "up":
          return { depth: depth - value, x };
        default:
          console.log("unknown command", command);
          return { depth, x };
      }
    } catch (e) {
      return { depth, x };
    }
  },
  {
    depth: 0,
    x: 0,
  }
);

console.log(position);
console.log(position.depth * position.x);
