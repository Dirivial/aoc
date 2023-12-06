const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

const times = input[0]
  .substring(6)
  .split(" ")
  .map((n) => Number(n))
  .filter((v) => v !== 0)
  .join("");

console.log("Time: ", times);

const records = input[1]
  .substring(9)
  .split(" ")
  .map((n) => Number(n))
  .filter((v) => v !== 0)
  .join("");

console.log("Distance: ", records);

const t = Number(times);
const r = Number(records);

// Brute forcing works (that's how I got the answer first), but I like this more
let start = 0;
for (let j = 1; j < t; j++) {
  const score = (t - j) * j;
  if (score > r) {
    start = j;
    break;
  }
}
let end = t;
for (let j = t; j > 0; j--) {
  const score = (t - j) * j;
  if (score > r) {
    end = j;
    break;
  }
}

// Upper - Lower => the first way is removed, hence add 1 to compensate
console.log(end - start + 1);
