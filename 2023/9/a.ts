const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n").map((v) => v.split(" ").map((n) => Number(n)));

const recursiveAnswer = (line: number[]): number => {
  if (line.every((v) => v === 0)) {
    return 0;
  }

  const newLine: number[] = [];
  for (let i = 1; i < line.length; i++) {
    newLine.push(line[i] - line[i - 1]);
  }
  return (line.at(-1) ?? 0) + recursiveAnswer(newLine);
};

let sum = 0;
input.forEach((line) => {
  sum += recursiveAnswer(line);
});

console.log(sum);
