const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n").map((v) => v.split(" ").map((n) => Number(n)));

const isAllZeros = (arr: number[]) => {
  return arr.every((v) => v === 0);
};

const computeLines = (initialLine: number[]): number[][] => {
  const lines: number[][] = [[...initialLine]];
  let newLine: number[] = [...initialLine];
  let l = 0;

  while (!isAllZeros(newLine)) {
    newLine = [];
    for (let i = 1; i < lines[l].length; i++) {
      const diff = lines[l][i] - lines[l][i - 1];
      newLine.push(diff);
    }
    l++;
    lines.push([...newLine]);
  }
  return lines;
};

const computeNextValue = (lines: number[][]): number => {
  for (let i = lines.length - 1; i > 0; i--) {
    const a = lines[i].at(-1);
    const b = lines[i - 1].at(-1);
    lines[i - 1].push((a ?? 0) + (b ?? 0));
  }
  return lines[0].at(-1) ?? 0;
};

let sum = 0;

input.forEach((line) => {
  const lines = computeLines(line);
  const next = computeNextValue(lines);
  sum += next;
});

console.log(sum);
