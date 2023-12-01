// LspStop -> LspStart Denols
// To get back, run LspStop -> LspStart tsserver

const _input = await Deno.readTextFile("./testInput.txt");

const input = _input.split("\n");

input.forEach((line: string) => {
  console.log(line);
});

export {};
