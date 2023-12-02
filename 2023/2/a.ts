const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n").map((l) => l.substring(5));

let sumOfIds = 0;

const maxBlue = 14;
const maxRed = 12;
const maxGreen = 13;

input.forEach((line) => {
  const [a, b] = line.split(":");
  const gameId = Number(a);

  // b ex. 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  const hands = b.split(";"); // Not always three hands

  let allValid = true;

  hands.forEach((hand) => {
    if (!allValid) return;
    const cubes = hand.split(",");
    cubes.forEach((cubeCount) => {
      const numCubes = Number(cubeCount.trim().split(" ")[0]);
      if (cubeCount.includes("red") && numCubes > maxRed) {
        allValid = false;
        return;
      } else if (cubeCount.includes("green") && numCubes > maxGreen) {
        allValid = false;
        return;
      } else if (cubeCount.includes("blue") && numCubes > maxBlue) {
        allValid = false;
        return;
      }
    });
  });

  if (allValid) {
    //console.log(line);
    sumOfIds += gameId;
  }
});

console.log(sumOfIds);
