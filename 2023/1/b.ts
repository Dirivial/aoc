const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

const validStuff = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

let res = 0;
input.forEach((line: string) => {
  let a = -1;
  let b = -1;
  for (let j = 0; j < line.length; j++) {
    for (let i = 0; i < validStuff.length; i++) {
      let front = line.startsWith(validStuff[i], j);
      if (front && a === -1) {
        a = i % 10;
      }
      let back = line.endsWith(validStuff[i], line.length - j);
      if (back && b === -1) {
        b = i % 10;
      }
    }
    if (a !== -1 && b !== -1) {
      res += a * 10 + b;
      break;
    }
  }
});

console.log(res);
