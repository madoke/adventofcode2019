const IntCodeComputer = require("./intcode-computer");

let computer;
let onOutput;

beforeEach(() => {
  onOutput = jest.fn();
  computer = new IntCodeComputer(onOutput);
});

/**
 * Helper function to test correct program results
 */
assertProgramResult = (program, expected) => {
  computer.loadProgram(program);
  computer.run();
  expect(computer.program).toEqual(expected);
};

/**
 * Helper function to test correct program cursor position
 */
assertCursorMovesTo = (program, expected) => {
  computer.loadProgram(program);
  computer.run();
  expect(computer.cursor).toEqual(expected);
};

describe("input parsing", () => {
  test("can parse input correctly", () => {
    const program = " 1,2,3,4 ";
    const result = [1, 2, 3, 4];
    computer.loadProgram(program);
    expect(computer.program).toEqual(result);
  });
});

describe("instruction processing", () => {
  test.each`
    input           | output
    ${"1,1,2,3"}    | ${[1, 1, 2, 3]}
    ${"1001,2,5,3"} | ${[1001, 2, 5, 10]}
  `("sum adds two parameters", ({input, output}) => {
    assertProgramResult(input, output);
  });

  test.each`
    input           | output
    ${"2,1,2,3"}    | ${[2, 1, 2, 2]}
    ${"1002,1,2,3"} | ${[1002, 1, 2, 2]}
  `("mul multiplies two parameters", ({input, output}) => {
    assertProgramResult(input, output);
  });

  test.each`
    input                 | output
    ${"5,4,5,99,1,88"}    | ${88}
    ${"5,4,5,99,0,88"}    | ${3}
    ${"1105,1,88"}        | ${88}
    ${"1105,0,88"}        | ${3}
  `(
    "jump if true moves the cursor to the designated position if value is non zero",
    ({input, output}) => {
      assertCursorMovesTo(input, output);
    }
  );

  test.each`
    input                 | output
    ${"6,4,5,99,1,88"}    | ${3}
    ${"6,4,5,99,0,88"}    | ${88}
    ${"1106,1,88"}        | ${3}
    ${"1106,0,88"}        | ${88}
  `(
    "jump if false moves the cursor to the designated position if value is zero",
    ({input, output}) => {
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
    ({input, output}) => {
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
    "equals than stores 1 in param 3 if param 1 = param 2, otherwise 0",
    ({input, output}) => {
      assertProgramResult(input, output);
    }
  );

  test.each`
    program             | input   | expected
    ${"3,3,99,4,0"}     | ${88}   | ${[3, 3, 99, 4, 88]}
    ${"1103,3,99,0"}    | ${88}   | ${[1103, 3, 99, 88]}
  `("input collects external input", ({program, input, expected}) => {
    computer.loadProgram(program);
    computer.run();
    computer.input(input);
    expect(computer.program).toEqual(expected);
  });

  test.each`
    program           | expected
    ${"4,3,99,88"}    | ${88}
    ${"1104,88,99"}   | ${88}
  `("output outputs values", ({program, expected}) => {
    computer.loadProgram(program);
    computer.run();
    expect(onOutput).toBeCalledTimes(1);
    expect(onOutput).toBeCalledWith(expected);
  });

});
