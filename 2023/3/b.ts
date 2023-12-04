const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

type coord = {
  x: number;
  y: number;
};

const gears: coord[] = [];

input.forEach((line, y) => {
  for (let x = 0; x < line.length; x++) {
    const code = line.charCodeAt(x);
    if (code === 42) {
      gears.push({ x, y });
    }
  }
});

let sum = 0;

const isNumber = (c: number) => {
  return c > 47 && c < 58;
};

const findNumber = (x: number, y: number, codes: number[]): boolean => {
  if (isNumber(input[y].charCodeAt(x))) {
    let l = x;
    let r = x;
    while (isNumber(input[y].charCodeAt(l))) {
      l--;
    }
    while (isNumber(input[y].charCodeAt(r))) {
      r++;
    }
    l++;
    codes.push(Number(input[y].substring(l, r)));
    return true;
  }
  return false;
};

gears.forEach((point) => {
  // Should check if out of bounds
  const gearCodes: number[] = [];
  // Above
  let n = findNumber(point.x, point.y - 1, gearCodes);
  if (!n) {
    // Upper diagonal
    findNumber(point.x - 1, point.y - 1, gearCodes);
    findNumber(point.x + 1, point.y - 1, gearCodes);
  }

  // Below
  n = findNumber(point.x, point.y + 1, gearCodes);
  if (!n) {
    // Lower diagonal
    findNumber(point.x - 1, point.y + 1, gearCodes);
    findNumber(point.x + 1, point.y + 1, gearCodes);
  }

  // Left and right
  findNumber(point.x - 1, point.y, gearCodes);
  findNumber(point.x + 1, point.y, gearCodes);

  if (gearCodes.length === 2) {
    sum += gearCodes.reduce((p, c) => p * c);
  }
});

console.log(sum);
