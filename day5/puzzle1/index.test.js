const IntCodeComputer3000 = require("./index");

let computer;

beforeEach(() => {
  computer = new IntCodeComputer3000();
});

test("sum works as expected", () => {
  const program = [1, 1, 2, 3];
  computer.runInstruction(program);
  expect(program).toEqual([1, 1, 2, 3]);
});

test("sum with modes works as expected", () => {
  const program = [1001, 2, 5, 3];
  computer.runInstruction(program);
  expect(program).toEqual([1001, 2, 5, 10]);
});

test("mul works as expected", () => {
  const program = [2, 1, 2, 3];
  computer.runInstruction(program);
  expect(program).toEqual([2, 1, 2, 2]);
});

test("mul with modes works as expected", () => {
  const program = [1002, 1, 2, 3];
  computer.runInstruction(program);
  expect(program).toEqual([1002, 1, 2, 2]);
});

test("output works as expected", () => {
  const program = [4, 0];
  expect(computer.runInstruction(program)).toEqual(4);
});

test("output with modes works as expected", () => {
  const program = [4, 1];
  expect(computer.runInstruction(program)).toEqual(1);
});

test("input works as expected", () => {
  const program = [3, 1];
  computer.inputs = [7];
  computer.runInstruction(program);
  expect(program).toEqual([3, 7]);
});

test("runs sequential instructions", () => {
  const program = [1001, 1, 1, 3, 1002, 5, 5, 7, 99];
  computer.runProgram(program);
  expect(program).toEqual([1001, 1, 1, 2, 1002, 5, 5, 25, 99]);
});

test("returns all outputs", () => {
  const program = [104, 1, 104, 2, 104, 3, 104, 4, 99];
  const result = computer.runProgram(program);
  expect(result).toEqual([1, 2, 3, 4]);
});

test("code 99 terminates execution", () => {
  const program = [99, 10, 20, 3];
  expect(computer.runInstruction(program, [0])).toEqual("HALT");
});

test("correctly reads the file and executes the program", async () => {
  await expect(computer.run(__dirname + "/input.test.txt")).resolves.toEqual(
    4
  );
});
