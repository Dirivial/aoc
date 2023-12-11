const _input = await Deno.readTextFile("input.txt");

const input = _input
  .split("\n")
  .map((line) => line.split("").map((v) => (v === "#" ? 1 : 0)));

const rowsToExpand = [];
const columnsToExpand = [];

for (let i = 0; i < input.length; i++) {
  if (!input[i].includes(1)) {
    rowsToExpand.push(i);
  }
  let noGalaxies = true;
  for (let j = 0; j < input.length; j++) {
    if (input[j][i] === 1) {
      noGalaxies = false;
      break;
    }
  }
  if (noGalaxies) {
    // Extend the dimension
    columnsToExpand.push(i);
  }
}

// Find galaxy indices
type Coordinate = {
  x: number;
  y: number;
};
const galaxies: Coordinate[] = [];
const expansionFactor = 999999;
let numRowExpansions = 0;

for (let i = 0; i < input.length; i++) {
  if (rowsToExpand.includes(i)) numRowExpansions++;
  let numColumnExpansions = 0;
  for (let j = 0; j < input[i].length; j++) {
    if (columnsToExpand.includes(j)) numColumnExpansions++;
    if (input[i][j] === 1) {
      galaxies.push({
        x: j + numColumnExpansions * expansionFactor,
        y: i + numRowExpansions * expansionFactor,
      });
    }
  }
}

console.log("Number of galaxies: ", galaxies.length);

let distanceSum = 0;

for (let i = 0; i < galaxies.length; i++) {
  const galaxyA = galaxies[i];
  for (let j = i + 1; j < galaxies.length; j++) {
    const galaxyB = galaxies[j];
    const distance =
      Math.abs(galaxyB.y - galaxyA.y) + Math.abs(galaxyB.x - galaxyA.x);
    distanceSum += distance;
  }
}

console.log(distanceSum);
