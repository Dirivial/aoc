const _input = await Deno.readTextFile("./testInput.txt");

const input = _input.split("\n");

input.forEach((line) => {
  console.log(line);
});
