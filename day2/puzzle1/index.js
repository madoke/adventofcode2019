const FileReader = require("../../utils/filereader");
const IntCodeComputer = require("../../utils/intcode-computer");

class ProgramRunner {
  constructor() {
    this.intCodeComputer = new IntCodeComputer();
  }

  runProgramWith1202Alarm(program) {
    this.intCodeComputer.loadProgram(program);
    this.intCodeComputer.program[1] = 12;
    this.intCodeComputer.program[2] = 2;
    this.intCodeComputer.run();
    return this.intCodeComputer.program;
  }

  runProgram(program) {
    this.intCodeComputer.loadProgram(program);
    this.intCodeComputer.run();
    return this.intCodeComputer.program;
  }

  run (inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      const filereader = new FileReader({
        inputFilePath,
        onContent: content => {
          resolve(that.runProgramWith1202Alarm(content)[0]);
        }
      });
      filereader.read();
    });
  };
}

module.exports = ProgramRunner;
