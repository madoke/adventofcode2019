const IntCodeComputer3000 = require("./index");

let computer;

beforeEach(() => {
  computer = new IntCodeComputer3000();
});

test("jump if true works as expected when first param non zero", () => {
  const program = [5, 1, 2];
  computer.runInstruction(program);
  expect(computer.cursor).toEqual(2);
});

test("jump if true works as expected when first param zero", () => {
  const program = [5, 2, 0];
  computer.runInstruction(program);
  expect(computer.cursor).toEqual(3);
});

test("jump if true works as expected when first param non zero with modes", () => {
  const program = [1105, 1, 2];
  computer.runInstruction(program);
  expect(computer.cursor).toEqual(2);
});

test("jump if true works as expected when first param zero with modes", () => {
  const program = [1105, 0, 0];
  computer.runInstruction(program);
  expect(computer.cursor).toEqual(3);
});

test("jump if false works as expected when first param non zero", () => {
  const program = [6, 3, 2, 1];
  computer.runInstruction(program);
  expect(computer.cursor).toEqual(3);
});

test("jump if false works as expected when first param zero", () => {
  const program = [6, 3, 2, 0];
  computer.runInstruction(program);
  expect(computer.cursor).toEqual(2);
});

test("jump if false works as expected when first param non zero with modes", () => {
  const program = [1106, 1, 2];
  computer.runInstruction(program);
  expect(computer.cursor).toEqual(3);
});

test("jump if false works as expected when first param zero with modes", () => {
  const program = [1106, 0, 0];
  computer.runInstruction(program);
  expect(computer.cursor).toEqual(0);
});

test("less than works as expected when first < second", () => {
  const program = [7, 1, 2, 3];
  computer.runInstruction(program);
  expect(program).toEqual([7, 1, 2, 1]);
});

test("less than works as expected when first > second", () => {
  const program = [7, 3, 2, 3];
  computer.runInstruction(program);
  expect(program).toEqual([7, 3, 2, 0]);
});

test("less than works as expected when first < second with modes", () => {
  const program = [1107, 1, 2, 3];
  computer.runInstruction(program);
  expect(program).toEqual([1107, 1, 2, 1]);
});

test("less than works as expected when first > second with modes", () => {
  const program = [1107, 2, 1, 3];
  computer.runInstruction(program);
  expect(program).toEqual([1107, 2, 1, 0]);
});

test("equals works as expected when first === second", () => {
  const program = [8, 1, 1, 3];
  computer.runInstruction(program);
  expect(program).toEqual([8, 1, 1, 1]);
});

test("equals works as expected when first !=== second", () => {
  const program = [8, 1, 2, 3];
  computer.runInstruction(program);
  expect(program).toEqual([8, 1, 2, 0]);
});

test("equals works as expected when first === second with modes", () => {
  const program = [1108, 1, 1, 3];
  computer.runInstruction(program);
  expect(program).toEqual([1108, 1, 1, 1]);
});

test("equals works as expected when first !== second with modes", () => {
  const program = [1108, 2, 1, 3];
  computer.runInstruction(program);
  expect(program).toEqual([1108, 2, 1, 0]);
});

test.each`
  program                                                      | input | output
  ${[3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]}                      | ${8}  | ${1}
  ${[3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]}                      | ${1}  | ${0}
  ${[3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]}                      | ${1}  | ${1}
  ${[3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]}                      | ${9}  | ${0}
  ${[3, 3, 1108, -1, 8, 3, 4, 3, 99]}                          | ${8}  | ${1}
  ${[3, 3, 1108, -1, 8, 3, 4, 3, 99]}                          | ${1}  | ${0}
  ${[3, 3, 1107, -1, 8, 3, 4, 3, 99]}                          | ${1}  | ${1}
  ${[3, 3, 1107, -1, 8, 3, 4, 3, 99]}                          | ${9}  | ${0}
  ${[3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]} | ${0}  | ${0}
  ${[3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]} | ${1}  | ${1}
  ${[3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]}         | ${0}  | ${0}
  ${[3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]}         | ${1}  | ${1}
`("successfully runs example programs", ({ program, input, output }) => {
  const result = computer.runProgram(program, [input]);
  expect(result[result.length - 1]).toEqual(output);
});

test("correctly reads the file and executes the program", async () => {
  await expect(computer.run(__dirname + "/input.test.txt")).resolves.toEqual(
    999
  );
});
