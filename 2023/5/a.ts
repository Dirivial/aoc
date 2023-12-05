const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

const seeds = input[0]
  .substring(7)
  .split(" ")
  .map((n) => Number(n));

type XtoYMap = {
  from: string;
  to: string;
  rangeMaps: RangeMap[];
};

type RangeMap = {
  destStart: number;
  sourceStart: number;
  range: number;
};

const maps: XtoYMap[] = [];

input.shift();

input.forEach((line) => {
  if (line.includes("-to-")) {
    const [f, t] = line.split(" ")[0].split("-to-");
    maps.push({
      from: f,
      to: t,
      rangeMaps: [],
    });
  } else if (line.length > 0) {
    const nums = line.split(" ").map((n) => Number(n));
    const rangeMap: RangeMap = {
      destStart: nums[0],
      sourceStart: nums[1],
      range: nums[2],
    };
    maps[maps.length - 1].rangeMaps.push(rangeMap);
  }
});

// Get location number for each seed
let lowest = Infinity;
seeds.forEach((seed) => {
  let n = seed;
  for (let i = 0; i < maps.length; i++) {
    const rangeMap = maps[i].rangeMaps;
    for (let j = 0; j < rangeMap.length; j++) {
      const rm = rangeMap[j];
      if (rm.sourceStart <= n && rm.sourceStart + rm.range > n) {
        n = rm.destStart + (n - rm.sourceStart);
        break;
      }
    }
  }

  if (lowest > n) {
    lowest = n;
  }
});

console.log(lowest);
