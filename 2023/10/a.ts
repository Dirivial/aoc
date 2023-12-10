const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");
const map = new Map<string, number[]>();
map.set("|", [0, 2]);
map.set("-", [1, 3]);
map.set("L", [0, 1]);
map.set("J", [0, 3]);
map.set("F", [1, 2]);
map.set("7", [2, 3]);

// Find the starting position
type Coordinate = {
  x: number;
  y: number;
};
let start: Coordinate = { x: 0, y: 0 };

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === "S") {
      start = {
        x: j,
        y: i,
      };
      break;
    }
  }
}

// Iterate through maze of pipes until markers cross
type Marker = {
  lastPos: Coordinate;
  currentPos: Coordinate;
  lastAction: number;
};

const firstMoves = (): Marker[] => {
  const starts: Marker[] = [];
  if (map.get(input[start.y - 1][start.x])?.includes(2)) {
    starts.push({
      lastPos: { x: start.x, y: start.y - 1 },
      currentPos: { x: start.x, y: start.y - 1 },
      lastAction: 0,
    });
  }
  if (map.get(input[start.y + 1][start.x])?.includes(0)) {
    starts.push({
      lastPos: { x: start.x, y: start.y + 1 },
      currentPos: { x: start.x, y: start.y + 1 },
      lastAction: 2,
    });
  }
  if (map.get(input[start.y][start.x - 1])?.includes(1)) {
    starts.push({
      lastPos: { x: start.x - 1, y: start.y },
      currentPos: { x: start.x - 1, y: start.y },
      lastAction: 3,
    });
  }
  if (map.get(input[start.y][start.x + 1])?.includes(3)) {
    starts.push({
      lastPos: { x: start.x + 1, y: start.y },
      currentPos: { x: start.x + 1, y: start.y },
      lastAction: 1,
    });
  }
  return starts;
};

const markers: Marker[] = firstMoves();

const marker: Marker = markers[0];

let numMoves = 0;
while (input[marker.currentPos.y][marker.currentPos.x] != "S") {
  const pipe = input[marker.currentPos.y][marker.currentPos.x] ?? "";
  const moveTo =
    map
      .get(pipe)
      ?.filter((v) => (v + 2) % 4 != marker.lastAction)
      .at(0) ?? 0;
  marker.lastPos = marker.currentPos;
  marker.lastAction = moveTo;
  switch (moveTo) {
    case 0:
      marker.currentPos = {
        x: marker.currentPos.x,
        y: marker.currentPos.y - 1,
      };
      break;
    case 1:
      marker.currentPos = {
        x: marker.currentPos.x + 1,
        y: marker.currentPos.y,
      };
      break;
    case 2:
      marker.currentPos = {
        x: marker.currentPos.x,
        y: marker.currentPos.y + 1,
      };
      break;
    case 3:
      marker.currentPos = {
        x: marker.currentPos.x - 1,
        y: marker.currentPos.y,
      };
      break;
  }
  numMoves++;
}

if (numMoves % 2 === 1) {
  numMoves++;
}
console.log(numMoves / 2);
