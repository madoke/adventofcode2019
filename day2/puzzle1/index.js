const FileReader = require("../../utils/filereader");
const OPSUM = 1;
const OPMUL = 2;
const OPHALT = 99;

class IntCodeComputer {
  opsum(program, index) {
    program[program[index + 3]] =
      program[program[index + 1]] + program[program[index + 2]];
    return program;
  }

  opmul(program, index) {
    program[program[index + 3]] =
      program[program[index + 1]] * program[program[index + 2]];
    return program;
  }

  runInstruction(program, index) {
    if (!program || index < 0 || index >= program.length) {
      throw new Error("Invalid program/index !");
    }
    switch (program[index]) {
      case OPHALT:
        return false;
      case OPMUL:
        return this.opmul(program, index);
      case OPSUM:
        return this.opsum(program, index);
      default:
        throw new Error("Invalid opcode !");
    }
  }

  runProgram(program) {
    let stack = program;
    for (let index = 0; index < program.length; index += 4) {
      const result = this.runInstruction(stack, index);
      if (!result) break;
      stack = result;
    }
    return stack;
  }

  runProgramWith1202Alarm(program) {
    const modifiedProgram = program;
    modifiedProgram[1] = 12;
    modifiedProgram[2] = 2;
    return this.runProgram(modifiedProgram);
  }

  parseProgram(raw) {
    return raw
      .trim()
      .split(",")
      .map(i => parseInt(i));
  }

  run (inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      const filereader = new FileReader({
        inputFilePath,
        onContent: content => {
          const program = that.parseProgram(content);
          resolve(that.runProgramWith1202Alarm(program)[0]);
        }
      });
      filereader.read();
    });
  };
}

module.exports = IntCodeComputer;
