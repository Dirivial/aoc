const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

let sum = 0;

const validStuff = [
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

const translation = new Map();
translation.set("one", "1");
translation.set("two", "2");
translation.set("three", "3");
translation.set("four", "4");
translation.set("five", "5");
translation.set("six", "6");
translation.set("seven", "7");
translation.set("eight", "8");
translation.set("nine", "9");
translation.set("zero", "0");

input.forEach((line) => {
  let l = 0;
  let r = line.length - 1;
  let a = "";
  let b = "";

  while (a === "") {
    const substr = line.substring(l);
    for (const valid of validStuff) {
      if (a === "" && substr.startsWith(valid)) {
        a = valid;
        break;
      }
    }
    l++;
  }
  while (b === "") {
    const substr = line.substring(r);
    for (const valid of validStuff) {
      if (substr.startsWith(valid)) {
        b = valid;
        break;
      }
    }
    r--;
  }

  if (translation.has(a)) {
    a = translation.get(a);
  }
  if (translation.has(b)) {
    b = translation.get(b);
  }

  sum += Number(a + b);
});

console.log(sum);
