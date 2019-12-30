const { getDigit } = require("./digits");
const OPSUM = 1;
const OPMUL = 2;
const OPINPUT = 3;
const OPOUTPUT = 4;
const OPJUMPTRUE = 5;
const OPJUMPFALSE = 6;
const OPLESSTHAN = 7;
const OPEQUALS = 8;
const OPHALT = 99;
const HALT = 8887;
const INPUT = 8888;

class IntCodeComputer {
  constructor(onOutput) {
    this.onOutput = onOutput || (() => {});
    this.cursor = 0;
    this.ops = {
      [OPHALT]: () => HALT,
      [OPSUM]: (program, mode1, mode2) => {
        let left = mode1
          ? program[this.cursor + 1]
          : program[program[this.cursor + 1]];
        let right = mode2
          ? program[this.cursor + 2]
          : program[program[this.cursor + 2]];
        program[program[this.cursor + 3]] = left + right;
        this.cursor += 4;
      },
      [OPMUL]: (program, mode1, mode2) => {
        let left = mode1
          ? program[this.cursor + 1]
          : program[program[this.cursor + 1]];
        let right = mode2
          ? program[this.cursor + 2]
          : program[program[this.cursor + 2]];
        program[program[this.cursor + 3]] = left * right;
        this.cursor += 4;
      },
      [OPJUMPTRUE]: (program, mode1, mode2) => {
        let left = mode1
          ? program[this.cursor + 1]
          : program[program[this.cursor + 1]];
        let right = mode2
          ? program[this.cursor + 2]
          : program[program[this.cursor + 2]];
        if (left !== 0) {
          this.cursor = right;
        } else {
          this.cursor += 3;
        }
      },
      [OPJUMPFALSE]: (program, mode1, mode2) => {
        let left = mode1
          ? program[this.cursor + 1]
          : program[program[this.cursor + 1]];
        let right = mode2
          ? program[this.cursor + 2]
          : program[program[this.cursor + 2]];
        if (left === 0) {
          this.cursor = right;
        } else {
          this.cursor += 3;
        }
      },
      [OPLESSTHAN]: (program, mode1, mode2) => {
        let left = mode1
          ? program[this.cursor + 1]
          : program[program[this.cursor + 1]];
        let right = mode2
          ? program[this.cursor + 2]
          : program[program[this.cursor + 2]];
        program[program[this.cursor + 3]] = left < right ? 1 : 0;
        this.cursor += 4;
      },
      [OPEQUALS]: (program, mode1, mode2) => {
        let left = mode1
          ? program[this.cursor + 1]
          : program[program[this.cursor + 1]];
        let right = mode2
          ? program[this.cursor + 2]
          : program[program[this.cursor + 2]];
        program[program[this.cursor + 3]] = left === right ? 1 : 0;
        this.cursor += 4;
      },
      [OPINPUT]: () => INPUT,
      [OPOUTPUT]: (program, mode1) => {
        let output = mode1
          ? program[this.cursor + 1]
          : program[program[this.cursor + 1]];
        this.cursor += 2;
        return output;
      }
    };
  }

  loadProgram(program) {
    this.program = program
      .trim()
      .split(",")
      .map(i => parseInt(i));
  }

  runInstruction() {
    const op = this.program[this.cursor];
    const opcode = op % 100;
    this.currentInstruction = opcode;
    const result = this.ops[opcode](
      this.program,
      getDigit(op, 3),
      getDigit(op, 4),
      getDigit(op, 5)
    );
    return result;
  }

  run() {
    while (true) {
      const result = this.runInstruction(program);
      if (result !== undefined && result !== null) {
        if (result === HALT || result === INPUT) {
          break;
        } else {
          this.onOutput(result);
        }
      }
    }
  }

  input(input) {
    if (this.currentInstruction === OPINPUT) {
      program[program[this.cursor + 1]] = input;
      this.cursor += 2;
      this.run();
    }
  }
}

module.exports = IntCodeComputer;
