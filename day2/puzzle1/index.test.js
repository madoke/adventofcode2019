const { IntCodeComputer, runIntcode } = require("./index");

test("code 1 sums r1, and r2 and stores the result in r3", () => {
  const program = [1, 1, 2, 3];
  const computer = new IntCodeComputer();
  expect(computer.runInstruction(program, 0)).toEqual([1, 1, 2, 3]);
});

test("code 2 multiplies r1, and r2 and stores the result in r3", () => {
  const program = [2, 1, 2, 3];
  const computer = new IntCodeComputer();
  expect(computer.runInstruction(program, 0)).toEqual([2, 1, 2, 2]);
});

test("code 99 does not execute", () => {
  const program = [99, 10, 20, 3];
  const computer = new IntCodeComputer();
  expect(computer.runInstruction(program, 0)).toEqual(false);
});

test("code unknown code throws", () => {
  const program = [31, 10, 20, 3];
  const computer = new IntCodeComputer();
  expect(() => {
    computer.runInstruction(program, 0);
  }).toThrow();
});

test("program executes correctly", () => {
  const program = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
  const result = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
  const computer = new IntCodeComputer();
  expect(computer.runProgram(program)).toEqual(result);
});

test("program with 1202 alarm executes correctly", () => {
  const program = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50, 22];
  const result = [1200, 12, 2, 24, 2, 3, 11, 0, 99, 30, 40, 50, 22];
  const computer = new IntCodeComputer();
  expect(computer.runProgramWith1202Alarm(program)).toEqual(result);
});

test("parses a program correctly", () => {
  const program = " 1,2,3,4 ";
  const result = [1, 2, 3, 4];
  const computer = new IntCodeComputer();
  expect(computer.parseProgram(program)).toEqual(result);
});

test("correctly reads the file and executes the program", async () => {
  await expect(runIntcode(__dirname + "/input.test.txt")).resolves.toEqual(2890696);
});
