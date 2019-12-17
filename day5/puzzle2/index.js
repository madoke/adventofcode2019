const FileReader = require("../../utils/filereader");
const IntCodeComputer3000 = require("../puzzle1");
const { getDigit } = require("../../utils/digits");
const OPJUMPTRUE = 5;
const OPJUMPFALSE = 6;
const OPLESSTHAN = 7;
const OPEQUALS = 8;

class IntCodeComputer4000 extends IntCodeComputer3000 {
  constructor() {
    super();
    this.ops = {
      ...this.ops,
      [OPJUMPTRUE]: (program, mode1, mode2) => {
        let left = mode1 ? program[this.cursor + 1] : program[program[this.cursor + 1]];
        let right = mode2 ? program[this.cursor + 2] : program[program[this.cursor + 2]];
        if(left !== 0) {
          this.cursor = right;
        } else {
          this.cursor += 3;
        }
      },
      [OPJUMPFALSE]: (program, mode1, mode2) => {
        let left = mode1 ? program[this.cursor + 1] : program[program[this.cursor + 1]];
        let right = mode2 ? program[this.cursor + 2] : program[program[this.cursor + 2]];
        if(left === 0) {
          this.cursor = right;
        } else {
          this.cursor += 3;
        }
      },
      [OPLESSTHAN]: (program, mode1, mode2) => {
        let left = mode1 ? program[this.cursor + 1] : program[program[this.cursor + 1]];
        let right = mode2 ? program[this.cursor + 2] : program[program[this.cursor + 2]];
        program[program[this.cursor + 3]] = (left < right) ? 1 : 0;
        this.cursor += 4;
      },
      [OPEQUALS]: (program, mode1, mode2) => {
        let left = mode1 ? program[this.cursor + 1] : program[program[this.cursor + 1]];
        let right = mode2 ? program[this.cursor + 2] : program[program[this.cursor + 2]];
        program[program[this.cursor + 3]] = (left === right) ? 1 : 0;
        this.cursor += 4;
      }
    };
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      const filereader = new FileReader({
        inputFilePath,
        onContent: content => {
          const program = that.parseProgram(content);
          const result = that.runProgram(program, 5);
          resolve(result[result.length -1]);
        }
      });
      filereader.read();
    });
  }
}

module.exports = IntCodeComputer4000;
