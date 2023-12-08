const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

const instructions = input.shift() ?? "";
input.shift(); // Remove the empty line

type Node = {
  left: string;
  right: string;
};

const map = new Map<string, Node>();
const currentNodes: string[] = [];
const goalNodes: string[] = [];

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

    if (from[2] === "A") {
      currentNodes.push(from);
    } else if (from[2] === "Z") {
      goalNodes.push(from);
    }

    map.set(from, node);
  }
});

const computePeriod = (start: string): number => {
  let currentNode = start;
  let numSteps = 0;
  let i = 0;
  while (!goalNodes.includes(currentNode)) {
    const instruction = instructions[i];
    if (instruction === "L") {
      currentNode = map.get(currentNode)?.left ?? "ZZZ";
    } else {
      currentNode = map.get(currentNode)?.right ?? "ZZZ";
    }

    numSteps++;
    i = (i + 1) % instructions.length;
  }
  return numSteps;
};

const periods: number[] = [];
currentNodes.forEach((node) => {
  periods.push(computePeriod(node));
});

// Function to find the GCD (Greatest Common Divisor) of two numbers
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Function to find the LCM (Least Common Multiple) of two numbers
function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

// Function to find the LCM of an array of numbers
function lcmOfArray(arr: number[]) {
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i]);
  }

  return result;
}

const result = lcmOfArray(periods);

console.log(`LCM of ${periods.join(", ")} is: ${result}`);
