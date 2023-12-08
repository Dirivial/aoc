const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

const instructions = input.shift() ?? "";
input.shift(); // Remove the empty line

type Node = {
  left: string;
  right: string;
};

const map = new Map<string, Node>();

input.forEach((line) => {
  const [from, to] = line.split("=").map((v) => v.trim());
  if (from !== undefined && to !== undefined) {
    const [left, right] = to
      .substring(1, to.length - 1)
      .split(",")
      .map((v) => v.trim());

    const node: Node = {
      left,
      right,
    };

    map.set(from, node);
  }
});

// Follow instructions until goal is found
let currentNode = "AAA";
let numSteps = 0;
let i = 0;
while (currentNode !== "ZZZ") {
  const instruction = instructions[i];
  if (instruction === "L") {
    currentNode = map.get(currentNode)?.left ?? "ZZZ";
  } else {
    currentNode = map.get(currentNode)?.right ?? "ZZZ";
  }

  numSteps++;
  i = (i + 1) % instructions.length;
}

console.log(numSteps);
