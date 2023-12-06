const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

const times = input[0]
  .substring(6)
  .split(" ")
  .map((n) => Number(n))
  .filter((v) => v !== 0);

console.log("Time: ", times);

const records = input[1]
  .substring(9)
  .split(" ")
  .map((n) => Number(n))
  .filter((v) => v !== 0);

console.log("Distance: ", records);

let nWaysToWin = 1;

for (let i = 0; i < times.length; i++) {
  const scoreToBeat = records[i];
  const maxTime = times[i];
  let numBetter = 0;
  for (let j = 1; j < maxTime; j++) {
    const score = (maxTime - j) * j;
    if (score > scoreToBeat) {
      numBetter++;
    }
  }
  nWaysToWin *= numBetter;
}

console.log(nWaysToWin);
