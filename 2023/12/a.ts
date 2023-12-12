const _input = await Deno.readTextFile("input.txt");

type Spring = {
  log: string[];
  groups: number[];
};

// Create spring objects
const input: Spring[] = _input.split("\n").map((v) => {
  const [a, b] = v.split(" ");
  return {
    log: a.split(""),
    groups: b.split(",").map((num) => Number(num)),
  };
});

const computePermutations = (
  current: string[],
  groups: number[],
  memo: Map<string, number>
): number => {
  // Create a string representing this state
  const joined = current.join("").concat("@" + groups.join(","));
  //console.log(joined);

  // Check if we have already been here
  if (memo.has(joined)) {
    return memo.get(joined) ?? 0;
  }

  // Check if the permutation is done -- if so, is it valid?
  if (!joined.includes("?")) {
    // Check if it is valid
    const matches = joined.match(/#+/g) ?? [];
    if (matches.length != groups.length) return 0;

    for (let i = 0; i < matches.length; i++) {
      if (matches[i].length != groups[i]) {
        memo.set(joined, 0);
        return 0;
      }
    }
    //console.log("New permutation!", joined);
    memo.set(joined, 1);
    return 1;
  }

  // Try new permutations
  let sumOfPermutations = 0;
  const indexOfFirstMissing = joined.indexOf("?");

  const copyA = [...current];
  const copyB = [...current];
  copyA[indexOfFirstMissing] = ".";
  copyB[indexOfFirstMissing] = "#";
  sumOfPermutations += computePermutations(copyA, groups, memo);
  sumOfPermutations += computePermutations(copyB, groups, memo);

  return sumOfPermutations;
};

let res = 0;
let lineNumber = 0;
input.forEach((spring) => {
  // Store the number of valid permutations for each log
  const memo = new Map<string, number>();
  const s = computePermutations(spring.log, spring.groups, memo);
  //console.log(s);
  res += s;
  lineNumber++;
  if (lineNumber % 50 === 0) {
    console.log(lineNumber + " of " + input.length);
  }
});
//console.log(computePermutations(input[1].log, input[1].groups));
console.log(res);
