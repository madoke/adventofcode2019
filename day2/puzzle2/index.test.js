const { IntCodeComputer2000 } = require("./index");

test("replaces nouns", () => {
  const program = [1, 50, 100, 3];
  const computer = new IntCodeComputer2000();
  const result = computer.runProgramWithOverrides(program, 10, 20);
  expect(result[1]).toBe(10);
  expect(result[2]).toBe(20);
});

test("correctly searches for verb and noun", () => {
  const program = [1, 1, 2, 0];
  const computer = new IntCodeComputer2000();
  const result = computer.searchVerbAndNoun(program, 3);
  expect(result).toBe(`0002`);
});
