const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

type coord = {
  x: number;
  y: number;
};

const interests: coord[] = [];

input.forEach((line, y) => {
  for (let x = 0; x < line.length; x++) {
    const code = line.charCodeAt(x);
    if (code != 46 && (code < 48 || code > 57)) {
      interests.push({ x, y });
    }
  }
});

let sum = 0;

const isNumber = (c: number) => {
  return c > 47 && c < 58;
};

const findNumber = (x: number, y: number): boolean => {
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
    sum += Number(input[y].substring(l, r));
    return true;
  }
  return false;
};

interests.forEach((point) => {
  // Should add a check if out of bounds

  // Above
  let n = findNumber(point.x, point.y - 1);
  if (!n) {
    // Upper diagonal
    findNumber(point.x - 1, point.y - 1);
    findNumber(point.x + 1, point.y - 1);
  }
  // Below
  n = findNumber(point.x, point.y + 1);
  if (!n) {
    // Lower diagonal
    findNumber(point.x - 1, point.y + 1);
    findNumber(point.x + 1, point.y + 1);
  }

  // Left and right
  findNumber(point.x - 1, point.y);
  findNumber(point.x + 1, point.y);
});

console.log(sum);
