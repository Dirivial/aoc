const _input = await Deno.readTextFile("input.txt");

type Hand = {
  cards: string;
  bid: number;
  type: number;
};

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
priority.set("J", 1);
priority.set("Q", 11);
priority.set("K", 12);
priority.set("A", 13);

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
  let sorted = cards
    .split("")
    .sort((a, b) => priority.get(a[0]) - priority.get(b[0]))
    .join("");

  const numJokers = sorted.lastIndexOf("J") + 1;
  let numCards = NumDifferentCards(sorted);

  // Ignore the jokers
  if (numJokers > 0) {
    numCards--;
    sorted = sorted.substring(numJokers);
    //console.log(sorted);
  }

  if (numCards <= 1) {
    // All jokers or Jokers & one other card
    return 6;
  }

  if (numCards === 2) {
    // Two types non-joker cards
    if (numJokers > 1) {
      return 5; // Four of a kind
    } else if (numJokers === 1) {
      return sorted.lastIndexOf(sorted[0]) === 1 ? 4 : 5;
    } else {
      const firstTypeEndsAt = sorted.lastIndexOf(sorted[0]);
      // If 1 or 2, its a full house
      return firstTypeEndsAt === 1 || firstTypeEndsAt === 2 ? 4 : 5;
    }
  }

  if (numCards === 3) {
    if (numJokers === 2) {
      return 3;
    } else if (numJokers === 1) {
      return 3;
    } else {
      let c = sorted + "";
      c = c.replaceAll(c[0], "");
      if (c.length === 4) {
        // Either pattern like AAQQ or QQQJ or AQQQ
        c = c.replaceAll(c[0], "");
        return c.length === 2 ? 2 : 3;
      }
      return c.length === 2 ? 3 : 2;
    }
  }

  if (numCards === 4) {
    return 1;
  }

  return 0;
};

const hands: Hand[] = _input.split("\n").map((line) => {
  const [cards, bid] = line.split(" ");
  return {
    cards,
    bid: Number(bid),
    type: ComputeType(cards),
  };
});

console.log(hands);

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
