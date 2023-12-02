const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

let sumOfIds = 0;

input.forEach((line) => {
  const [a, b] = line.split(":");

  // b ex. 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  const hands = b.split(";"); // Not always three hands

  let maxRed = 0;
  let maxBlue = 0;
  let maxGreen = 0;

  hands.forEach((hand) => {
    const cubes = hand.split(",");
    cubes.forEach((cubeCount) => {
      const numCubes = Number(cubeCount.trim().split(" ")[0]);
      if (cubeCount.includes("red") && numCubes > maxRed) {
        maxRed = numCubes;
      } else if (cubeCount.includes("green") && numCubes > maxGreen) {
        maxGreen = numCubes;
      } else if (cubeCount.includes("blue") && numCubes > maxBlue) {
        maxBlue = numCubes;
      }
    });
  });

  const power = maxBlue * maxGreen * maxRed;
  sumOfIds += power;
});

console.log(sumOfIds);
