const IntCodeComputer = require("./intcode-computer");

let computer;

beforeEach(() => {
  computer = new IntCodeComputer();
});

/**
 * Helper function to test correct program results
 */
assertProgramResult = (program, expected) => {
  computer.loadProgram(program);
  computer.runInstruction();
  expect(computer.program).toEqual(expected);
};

/**
 * Helper function to test correct program cursor position
 */
assertCursorMovesTo = (program, expected) => {
  computer.loadProgram(program);
  computer.runInstruction();
  expect(computer.cursor).toEqual(expected);
};

describe("instruction processing", () => {
  test.each`
    input           | output
    ${"1,1,2,3"}    | ${[1, 1, 2, 3]}
    ${"1001,2,5,3"} | ${[1001, 2, 5, 10]}
  `("sum adds two parameters", ({ input, output }) => {
    assertProgramResult(input, output);
  });

  test.each`
    input           | output
    ${"2,1,2,3"}    | ${[2, 1, 2, 2]}
    ${"1002,1,2,3"} | ${[1002, 1, 2, 2]}
  `("mul multiplies two parameters", ({ input, output }) => {
    assertProgramResult(input, output);
  });

  test.each`
    input         | output
    ${"5,1,2"}    | ${2}
    ${"5,2,0"}    | ${3}
    ${"1105,1,2"} | ${2}
    ${"1105,0,0"} | ${3}
  `(
    "jump if true moves the cursor to the designated position if value is non zero",
    ({ input, output }) => {
      assertCursorMovesTo(input, output);
    }
  );

  test.each`
    input         | output
    ${"6,3,2,1"}  | ${3}
    ${"6,3,2,0"}  | ${2}
    ${"1106,1,2"} | ${3}
    ${"1106,0,0"} | ${0}
  `(
    "jump if false moves the cursor to the designated position if value is zero",
    ({ input, output }) => {
      assertCursorMovesTo(input, output);
    }
  );

  test.each`
    input           | output
    ${"7,1,2,3"}    | ${[7, 1, 2, 1]}
    ${"7,3,2,3"}    | ${[7, 3, 2, 0]}
    ${"1107,1,2,3"} | ${[1107, 1, 2, 1]}
    ${"1107,2,1,3"} | ${[1107, 2, 1, 0]}
  `(
    "less than stores 1 in param 3 if param 1 < param 2, otherwise 0",
    ({ input, output }) => {
      assertProgramResult(input, output);
    }
  );

  test.each`
    input           | output
    ${"8,1,1,3"}    | ${[8, 1, 1, 1]}
    ${"8,1,2,3"}    | ${[8, 1, 2, 0]}
    ${"1108,1,1,3"} | ${[1108, 1, 1, 1]}
    ${"1108,2,1,3"} | ${[1108, 2, 1, 0]}
  `(
    "equals than stores 1 in param 3 if param 1 == param 2, otherwise 0",
    ({ input, output }) => {
      assertProgramResult(input, output);
    }
  );
});
