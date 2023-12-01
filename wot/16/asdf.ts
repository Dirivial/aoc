// ===========================================================
// PART 1
// ===========================================================
const input = await Deno.readTextFile("./input.txt");
let answer1 = 0;
const parsed = input.split(`\n`);

/** NODE => flow rate */
const flowRates: Record<string, number> = {};
/** NODE:NODE -> Hops */
const shortestPaths: Record<string, number> = {};
const allNodes = new Array<string>();
const nodesWithFlow = new Array<string>();
const flowNodeIndexes: Record<string, number> = {};

// PARSE THE GRAPH
for (const row of parsed) {
  const [, from, rate, toArray] =
    /Valve ([^)]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/.exec(
      row
    ) ?? [];
  const flowRate = Number(rate);
  flowRates[from] = flowRate;
  allNodes.push(from);
  if (flowRate > 0) {
    nodesWithFlow.push(from);
    flowNodeIndexes[from] = nodesWithFlow.length;
  }
  shortestPaths[`${from}:${from}`] = 0;
  for (const to of toArray.split(", ")) {
    shortestPaths[`${from}:${to}`] = 1;
  }
}

// FLOYD WARSHALL to fill in remaining shortest paths.
for (const hopNode of allNodes) {
  for (const node1 of allNodes) {
    for (const node2 of allNodes) {
      shortestPaths[`${node1}:${node2}`] = Math.min(
        shortestPaths[`${node1}:${node2}`] ?? 1e6,
        (shortestPaths[`${node1}:${hopNode}`] ?? 1e6) +
          (shortestPaths[`${hopNode}:${node2}`] ?? 1e6)
      );
    }
  }
}

function addOpen(current: number, node: string): number {
  const openMask = 1 << flowNodeIndexes[node];
  return current | openMask;
}

function isOpen(current: number, node: string): boolean {
  const openMask = 1 << flowNodeIndexes[node];
  // Stupid "prettier" won't let me inline this code and puts bad parentheses!
  const isOpenNum = current & openMask;
  return isOpenNum > 0;
}

/** This is AFTER we've visited a node and OPENED it. */
type Item = {
  /** Valves that are open */
  openMask: number;
  /** How many minutes left */
  remaining: number;
  /** Current node */
  current: string;
  /** How much gas will flow out. */
  total: number;
};

function graphSearch(minutes: number, onVisit: (item: Item) => void) {
  const fringe: Array<Item> = [];
  fringe.push({ current: "AA", remaining: minutes, openMask: 0, total: 0 });
  const visited = new Set<string>();
  while (fringe.length > 0) {
    const item = fringe.pop()!;
    const { openMask, remaining, current, total } = item;
    const visitedKey = `${current}:${remaining}:${openMask}:${total}`;
    if (visited.has(visitedKey)) continue;
    visited.add(visitedKey);

    onVisit(item);

    if (remaining === 0) {
      continue;
    }

    for (const next of nodesWithFlow) {
      if (isOpen(openMask, next)) continue;
      const nextRemaining = remaining - shortestPaths[`${current}:${next}`] - 1;
      if (nextRemaining <= 0) continue;
      fringe.push({
        current: next,
        openMask: addOpen(openMask, next),
        remaining: nextRemaining,
        total: total + nextRemaining * flowRates[next],
      });
    }
  }
}

graphSearch(30, (item) => {
  answer1 = Math.max(item.total, answer1);
});

console.info(`Answer1: ${answer1}`);

// ===========================================================
// PART 2
// ===========================================================

let answer2 = 0;
const bestAt26 = new Map<number, number>();
graphSearch(26, (item) => {
  bestAt26.set(
    item.openMask,
    Math.max(bestAt26.get(item.openMask) ?? 0, item.total)
  );
});

for (const [openMask1, best1] of bestAt26) {
  for (const [openMask2, best2] of bestAt26) {
    const overlap = openMask1 & openMask2;
    if (overlap !== 0) continue;
    answer2 = Math.max(answer2, best1 + best2);
  }
}

console.info(`Answer2: ${answer2}`);
