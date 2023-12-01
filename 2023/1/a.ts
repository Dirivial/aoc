const _input = await Deno.readTextFile("input.txt");

const input = _input.split("\n");

let sum = 0;

input.forEach((line) => {
  let i = -1;
  let a = "";
  let b = "";
  while (true) {
    const code = line.charCodeAt(++i);
    if (code > 47 && code < 58) {
      a = line.charAt(i);
      break;
    }
  }
  i = line.length;
  while (true) {
    const code = line.charCodeAt(--i);
    if (code > 47 && code < 58) {
      b = line.charAt(i);
      break;
    }
  }
  sum += Number(a + b);
});

console.log(sum);
