const _input = await Deno.readTextFile("input.txt");

type Hand = {
  cards: string;
  bid: number;
  type: number;
};

const NumDifferentCards = (cards: string): number => {
  let sum = 0;
  let c = cards + "";
  while (c.length > 0) {
    c = c.replaceAll(c[0], "");
    sum++;
  }

  return sum;
};

const ComputeType = (cards: string): number => {
  const sorted = cards.split("").sort().join("");

  const numCards = NumDifferentCards(sorted);
  if (numCards === 1) {
    return 6;
  } else if (numCards === 2) {
    // Full house or Four of a kind
    let c = sorted + "";
    c = c.replaceAll(c[0], "");
    return c.length === 1 || c.length === 4 ? 5 : 4;
  } else if (numCards === 3) {
    // Tow pair of three of a kind
    let c = sorted + "";
    c = c.replaceAll(c[0], "");
    if (c.length === 4) {
      // Either pattern like AAQQ or QQQJ or AQQQ
      c = c.replaceAll(c[0], "");
      return c.length === 2 ? 2 : 3;
    }
    return c.length === 2 ? 3 : 2;
  } else if (numCards === 4) {
    return 1;
  }

  return 0;
};

const hands = _input.split("\n").map((line) => {
  const [cards, bid] = line.split(" ");
  return {
    cards,
    bid: Number(bid),
    type: ComputeType(cards),
  };
});

console.log(hands);

const priority = new Map();
priority.set("2", 2);
priority.set("3", 3);
priority.set("4", 4);
priority.set("5", 5);
priority.set("6", 6);
priority.set("7", 7);
priority.set("8", 8);
priority.set("9", 9);
priority.set("T", 10);
priority.set("J", 11);
priority.set("Q", 12);
priority.set("K", 13);
priority.set("A", 14);

// Sort based on type
hands.sort((a, b) => {
  if (a.type !== b.type) return a.type - b.type;

  for (let i = 0; i < 5; i++) {
    if (a.cards[i] === b.cards[i]) continue;
    if (priority.get(a.cards[i]) > priority.get(b.cards[i])) {
      return 1;
    } else {
      return -1;
    }
  }
  // Equal
  return 0;
});

let sum = 0;
for (let i = 0; i < hands.length; i++) {
  sum += hands[i].bid * (i + 1);
}
console.log(sum);
