const FileReader = require("../../utils/filereader");
const IntCodeComputer = require("../../day2/puzzle1");
const { getDigit } = require("../../utils/digits");
const OPSUM = 1;
const OPMUL = 2;
const OPINPUT = 3;
const OPOUTPUT = 4;
const OPHALT = 99;
const HALT = "HALT";

class IntCodeComputer3000 extends IntCodeComputer {
  constructor() {
    super();
    this.inputs = [];
    this.cursor = 0;
    this.ops = {
      [OPHALT]: () => HALT,
      [OPSUM]: (program, mode1, mode2) => {
        let left = mode1 ? program[this.cursor + 1] : program[program[this.cursor + 1]];
        let right = mode2 ? program[this.cursor + 2] : program[program[this.cursor + 2]];
        program[program[this.cursor + 3]] = left + right;
        this.cursor += 4;
      },
      [OPMUL]: (program, mode1, mode2) => {
        let left = mode1 ? program[this.cursor + 1] : program[program[this.cursor + 1]];
        let right = mode2 ? program[this.cursor + 2] : program[program[this.cursor + 2]];
        program[program[this.cursor + 3]] = left * right;
        this.cursor += 4;
      },
      [OPINPUT]: (program) => {
        const input = this.inputs.shift();
        program[program[this.cursor + 1]] = input;
        this.cursor += 2;
      },
      [OPOUTPUT]: (program, mode1) => {
        let output = mode1 ? program[this.cursor + 1] : program[program[this.cursor + 1]];
        this.cursor += 2;
        return output;
      }
    };
  }
  
  runInstruction(program) {
    const op = program[this.cursor];
    const opcode = op % 100;
    const result = this.ops[opcode](
      program,
      getDigit(op, 3),
      getDigit(op, 4),
      getDigit(op, 5)
    );
    return result;
  }

  runProgram(program, inputs) {
    this.inputs = inputs || this.inputs;
    const outputs = [];
    while(true) {
      const result = this.runInstruction(program);
      if(result === HALT) {
        break;
      }
      if(result !== undefined) {
        outputs.push(result);
      }
    }
    return outputs;
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      const filereader = new FileReader({
        inputFilePath,
        onContent: content => {
          const program = that.parseProgram(content);
          const result = that.runProgram(program, 1);
          resolve(result[result.length -1]);
        }
      });
      filereader.read();
    });
  }
}

module.exports = IntCodeComputer3000;
