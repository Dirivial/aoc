const my_input = await Deno.readTextFile("input.txt");

const input = my_input.split("\n").map((v) => {
  return v.split(":")[1].trim();
});

let sum = 0;

const getNumbers = (str: string): number[] => {
  const nums: number[] = [];

  str.split(" ").forEach((n) => nums.push(Number(n)));

  return nums;
};

input.forEach((line) => {
  const [p1, p2] = line.split("|");

  const winningNumbers: number[] = getNumbers(p1.trim());
  const playerNumbers: number[] = getNumbers(p2.trim());

  console.log(winningNumbers.length + " | " + playerNumbers.length);

  let cardSum = 0;

  playerNumbers.forEach((n) => {
    if (n != 0 && winningNumbers.includes(n)) {
      if (cardSum === 0) {
        cardSum++;
      } else {
        cardSum *= 2;
      }
    }
  });

  sum += cardSum;
});

console.log(sum);
