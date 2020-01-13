const FileReader = require("../../utils/filereader");
const IntCodeComputer = require("../../utils/intcode-computer");

class ProgramRunner {
  constructor() {
    this.intCodeComputer = new IntCodeComputer(this.onOutput.bind(this));
  }

  onOutput(output) {
    this.lastOutput = output;
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function (resolve, _) {
      const filereader = new FileReader({
        inputFilePath,
        onContent: content => {
          that.intCodeComputer.loadProgram(content);
          that.intCodeComputer.run();
          that.intCodeComputer.input(1);
          resolve(that.lastOutput);
        }
      });
      filereader.read();
    });
  }
}

module.exports = ProgramRunner;
