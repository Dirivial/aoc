const _input = await Deno.readTextFile("./test.txt");
const input = _input.split("\n");

type Valve = {
  label: string;
  flowRate: number;
  leadsTo: { label: string; weight: number }[];
};

type State = {
  opened: string;
  timeLeft: number;
  current: string;
  flow: number;
};

const valves: Valve[] = [];

input.forEach((line) => {
  const labels = line.match(/([A-Z][A-Z])/g)!;
  const label = labels.shift()!;
  const flowRate = line.match(/(\d+)/)!.at(0)!;
  const leadsTo = labels.map((label) => ({ label, weight: 1 }));

  valves.push({
    label,
    flowRate: parseInt(flowRate),
    leadsTo,
  });
});

/*
// Create a new graph, where each node is a valve with a flow rate > 0 and the edges have weights
for (const valveName in valves) {
  const boringValve = valves[valveName];

  if (boringValve.flowRate === 0) {
    // Remove this valve from the graph, the ones who are connected should have updated path and weights
    for (const vName in valves) {
      if (vName !== valveName) {
        const v = valves[vName];
        const boringValveIndex = v.leadsTo.findIndex(
          (x) => x.label === boringValve.label
        );
        if (boringValveIndex !== -1) {
          v.leadsTo.splice(boringValveIndex, 1);
          const newLeadsTo = boringValve.leadsTo
            .map((x) => ({
              label: x.label,
              weight: x.weight + 1,
            }))
            .filter((x) => x.label !== v.label);

          newLeadsTo.forEach((x) => {
            let found = false;
            for (const v2 of v.leadsTo) {
              if (v2.label === x.label) {
                v2.weight = Math.min(v2.weight, x.weight);
                found = true;
              }
            }
            if (!found) {
              v.leadsTo.push(x);
            }
          });
        }
      }
    }
  }
}

valves = valves.filter((v) => v.flowRate > 0);
*/
const pressures = new Map<string, number>();

function iAmDepressed(
  state: string,
  time: number,
  opened: string[]
): number | undefined {
  if (time <= 0) return 0;

  // Check if we have already calculated this
  const key = `${state},${time},${opened.join(",")}`;
  if (pressures.has(key)) return pressures.get(key)!;

  // Calculate the pressure
  const valve = valves.find((v) => v.label === state)!;
  let highest = 0;
  for (let i = 0; i < valve.leadsTo.length; i++) {
    const next = valve.leadsTo[i];
    if (opened.includes(next.label)) continue;

    const newOpened = [...opened, next.label];
    const nextPressure = iAmDepressed(
      next.label,
      time - (next.weight + 1),
      newOpened
    );
    if (nextPressure !== undefined) {
      highest = Math.max(highest, nextPressure + valve.flowRate * time);
    }
  }

  return highest;
}

console.log(iAmDepressed("AA", 30, []));
