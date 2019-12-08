const IntCodeComputer = require("../puzzle1");
const FileReader = require("../../utils/filereader");

class IntCodeComputer2000 extends IntCodeComputer {
  runProgramWithOverrides(program, noun, verb) {
    const overridenProgram = program;
    overridenProgram[1] = noun;
    overridenProgram[2] = verb;
    return super.runProgram(overridenProgram);
  }

  searchVerbAndNoun(program, expectedResult) {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        try {
          let testProgram = [...program];
          let result = this.runProgramWithOverrides(testProgram, i, j);
          if (result[0] === expectedResult) {
            return `${i < 10 ? "0" + i : i}${j < 10 ? "0" + j : j}`;
          }
        } catch (e) {
          console.log(e);
          continue;
        }
      }
    }
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      const filereader = new FileReader({
        inputFilePath,
        onContent: content => {
          const program = that.parseProgram(content);
          resolve(that.searchVerbAndNoun(program, 19690720));
        }
      });
      filereader.read();
    });
  }
}

module.exports = IntCodeComputer2000;
