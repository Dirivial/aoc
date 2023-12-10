const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

type Pipe = {
  openingA: number;
  openingB: number;
};

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
  if (map.get(input?.at(start.y - 1)?.at(start.x) ?? "")?.includes(2)) {
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
const piped = new Set();
piped.add(start.x + ";" + start.y);

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
  piped.add(marker.lastPos.x + ";" + marker.lastPos.y);
}

const inputScuffed: string[][] = [];
for (let i = 0; i < input.length; i++) {
  inputScuffed.push([]);
  for (let j = 0; j < input[i].length; j++) {
    if (!piped.has(j + ";" + i)) {
      inputScuffed[i].push(".");
    } else {
      if (input[i][j] === "S") {
        const a = (markers[0].lastAction + 2) % 4;
        const b = (markers[1].lastAction + 2) % 4;
        if (a == 0 && b == 2) {
          inputScuffed[i].push("|");
        } else if (a == 0 && b == 1) {
          inputScuffed[i].push("L");
        } else if (a == 0 && b == 3) {
          inputScuffed[i].push("J");
        } else if (a == 1 && b == 3) {
          inputScuffed[i].push("-");
        } else if (a == 1 && b == 2) {
          inputScuffed[i].push("F");
        } else if (a == 2 && b == 3) {
          inputScuffed[i].push("7");
        }
      } else {
        inputScuffed[i].push(input[i][j]);
      }
    }
  }
}

console.log(inputScuffed.map((v) => v.join("")));

const isEnc = (x: number, y: number): boolean => {
  const sumStuff = [0, 0];
  for (let i = 1; i <= x; i++) {
    switch (inputScuffed[y][x - i]) {
      case "J":
        sumStuff[0]++;
        break;
      case "|":
        sumStuff[0]++;
        break;
      case "L":
        sumStuff[0]++;
        break;
    }
  }
  return sumStuff[0] % 2 === 1;
};

let sumArea = 0;
const enclosedStuff = new Set();

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (!piped.has(j + ";" + i)) {
      // See if the current position is enclosed
      if (isEnc(j, i)) {
        sumArea++;
        enclosedStuff.add(j + ";" + i);
      }
    }
  }
}

for (let i = 0; i < input.length; i++) {
  const row = [];
  for (let j = 0; j < input[i].length; j++) {
    if (enclosedStuff.has(j + ";" + i)) {
      row.push("I");
    } else {
      if (piped.has(j + ";" + i)) {
        row.push(".");
      } else {
        row.push("O");
        //row.push(inputScuffed[i][j]);
      }
    }
  }
  console.log(row.join(""));
}

let inside = false;
let lastTurn = "";
let sumArea2 = 0;
const insides: string[][] = [];
for (let i = 0; i < input.length; i++) {
  insides.push([]);
  lastTurn = "";
  inside = false;
  for (let j = 0; j < input[i].length; j++) {
    const c = input[i][j];
    if (piped.has(j + ";" + i)) {
      switch (c) {
        case "|":
          inside = !inside;
          break;
        case "F":
          lastTurn = "F";
          break;
        case "L":
          lastTurn = "L";
          break;
        case "7":
          if (lastTurn === "L") {
            inside = !inside;
          }
          lastTurn = "";
          break;
        case "J":
          if (lastTurn === "F") {
            inside = !inside;
          }
          lastTurn = "";
          break;
        default:
      }
      insides[i].push(".");
    } else {
      if (inside) {
        sumArea2++;
        insides[i].push("I");
      } else {
        insides[i].push("O");
      }
    }
  }
}
console.log(insides.map((v) => v.join("")));

console.log(sumArea);
console.log(sumArea2);
