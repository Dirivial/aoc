const my_input = await Deno.readTextFile("input.txt");

const copies: number[] = [];

const input = my_input.split("\n").map((v) => {
  copies.push(1);
  return v.split(":")[1].trim();
});

let sum = 0;

const getNumbers = (str: string): number[] => {
  const nums: number[] = [];

  str.split(" ").forEach((n) => nums.push(Number(n)));

  return nums.filter((v) => v != 0);
};

input.forEach((line, index) => {
  const [p1, p2] = line.split("|");

  const winningNumbers: number[] = getNumbers(p1.trim());
  const playerNumbers: number[] = getNumbers(p2.trim());

  //console.log(winningNumbers.length + " | " + playerNumbers.length);

  let cardSum = 0;

  playerNumbers.forEach((n) => {
    if (n != 0 && winningNumbers.includes(n)) {
      cardSum++;
    }
  });

  const numberOfThisCard = copies[index];

  for (let i = 1; i <= cardSum; i++) {
    copies[index + i] += numberOfThisCard;
  }
});

sum = copies.reduce((p, c) => p + c);
console.log(copies);
console.log(sum);
