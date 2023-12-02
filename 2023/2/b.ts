const _input = await Deno.readTextFile("input.txt");

const input = _input
  .split("\n")
  .map((l) => l.split(":")[1].replaceAll(";", ","));

let powerSum = 0;

input.forEach((line) => {
  const maxxes = [0, 0, 0];

  // Line ex. 1 blue, 2 green, 3 green, 4 blue, 1 red, 1 green, 1 blue
  const cubes = line.split(",");
  cubes.forEach((cubeGroup) => {
    const numCubes = Number(cubeGroup.trim().split(" ")[0]);

    if (cubeGroup.includes("red") && numCubes > maxxes[0]) {
      maxxes[0] = numCubes;
    } else if (cubeGroup.includes("green") && numCubes > maxxes[1]) {
      maxxes[1] = numCubes;
    } else if (cubeGroup.includes("blue") && numCubes > maxxes[2]) {
      maxxes[2] = numCubes;
    }
  });

  powerSum += maxxes.reduce((p, c) => p * c);
});

console.log(powerSum);
