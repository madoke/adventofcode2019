const AmplificationCircuit = require("./amp-circuit");
const IntCodeComputer4000 = require("../../day5/puzzle2");

let amplifiers, fakeAmplifier1, fakeAmplifier2, fakeAmplifiers, circuit;

beforeEach(() => {
  amplifiers = [
    new IntCodeComputer4000(),
    new IntCodeComputer4000(),
    new IntCodeComputer4000(),
    new IntCodeComputer4000(),
    new IntCodeComputer4000()
  ];
  fakeAmplifier1 = { runProgram: jest.fn().mockReturnValue([11]) };
  fakeAmplifier2 = { runProgram: jest.fn().mockReturnValue([12]) };
  fakeAmplifiers = [fakeAmplifier1, fakeAmplifier2];
});

test("passes amplifierArguments and phase settings correctly", () => {
  const fakeProgram = [];
  circuit = new AmplificationCircuit(fakeProgram, fakeAmplifiers);
  const result = circuit.runCircuit(10, [40, 50]);
  expect(fakeAmplifier1.runProgram).toHaveBeenCalledWith(fakeProgram, [40, 10]);
  expect(fakeAmplifier2.runProgram).toHaveBeenCalledWith(fakeProgram, [50, 11]);
  expect(result).toEqual(12);
});

test.each`
  program                                                                                                                                   | phaseSetting       | maxThrusterSignal
  ${[3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0]}                                                                       | ${[4, 3, 2, 1, 0]} | ${43210}
  ${[3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0]}                                     | ${[0, 1, 2, 3, 4]} | ${54321}
  ${[3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33, 1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0]} | ${[1, 0, 4, 3, 2]} | ${65210}
`(
  "successfully runs example programs",
  ({ program, phaseSetting, maxThrusterSignal }) => {
    circuit = new AmplificationCircuit(program, amplifiers);
    const result = circuit.runCircuit(0, phaseSetting);
    expect(result).toEqual(maxThrusterSignal);
  }
);
