const {getDigit} = require("./digits");
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
const RUNNING = 1;
const WAITFORINPUT = 2;
const STOPPED = 3

class IntCodeComputer {
  constructor(onOutput) {
    this.onOutput = onOutput || (() => {
    });
    this.cursor = 0;
    this.state = STOPPED;
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
      [OPINPUT]: (program, mode1) => {
        this.inputMode = mode1;
        return INPUT
      },
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
    if (!this.ops.hasOwnProperty(opcode)) {
      return HALT;
    }
    const result = this.ops[opcode](
      this.program,
      getDigit(op, 3),
      getDigit(op, 4),
      getDigit(op, 5)
    );
    return result;
  }

  run() {
    this.state = RUNNING;
    while (this.cursor <= this.program.length) {
      const result = this.runInstruction();
      if (result !== undefined && result !== null) {
        switch (result) {
          case HALT:
            this.state = STOPPED;
            return;
          case INPUT:
            this.state = WAITFORINPUT;
            return;
          default:
            this.onOutput(result);
        }
      }
    }
    this.state = STOPPED;
  }

  input(input) {
    if (this.state === WAITFORINPUT) {
      let position;
      if (this.inputMode) {
        position = this.program[this.cursor + 1]
      } else {
        position = this.program[this.program[this.cursor + 1]];
      }
      this.program[position] = input;
      this.cursor += 2;
    }
    this.run();
  }
}

module.exports = IntCodeComputer;
