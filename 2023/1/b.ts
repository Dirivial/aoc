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

const validStuffRev = [
  "eno",
  "owt",
  "eerht",
  "ruof",
  "evif",
  "xis",
  "neves",
  "thgie",
  "enin",
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
translation.set("eno", "1");
translation.set("owt", "2");
translation.set("eerht", "3");
translation.set("ruof", "4");
translation.set("evif", "5");
translation.set("xis", "6");
translation.set("neves", "7");
translation.set("thgie", "8");
translation.set("enin", "9");
translation.set("orez", "0");

input.forEach((line) => {
  let i = 0;
  let a = "";
  let b = "";

  while (a === "") {
    const substr = line.substring(i, i + 5);
    for (const valid of validStuff) {
      if (substr.startsWith(valid)) {
        a = valid;
        break;
      }
    }
    i++;
  }

  const revLine = line.split("").reverse().join("");
  i = 0;

  while (b === "" && i < line.length) {
    const substr = revLine.substring(i, i + 5);
    for (const valid of validStuffRev) {
      if (substr.startsWith(valid)) {
        b = valid;
        console.log(b);
        break;
      }
    }
    i++;
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
