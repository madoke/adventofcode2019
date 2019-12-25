const AmplificationCircuit = require("./amp-circuit");
const IntCodeComputer4000 = require("../../day5/puzzle2");
const FileReader = require("../../utils/filereader");
const { permutations } = require("../../utils/arrays");

class Puzzle71 {
  run(inputFilePath) {
    return new Promise(function(resolve, _) {
      const filereader = new FileReader({
        inputFilePath,
        onContent: content => {
          const phaseSettings = permutations([0, 1, 2, 3, 4]);
          const results = [];
          for (let i = 0; i < phaseSettings.length; i++) {
            const amplifiers = [
              new IntCodeComputer4000(),
              new IntCodeComputer4000(),
              new IntCodeComputer4000(),
              new IntCodeComputer4000(),
              new IntCodeComputer4000()
            ];
            const program = amplifiers[0].parseProgram(content);
            const circuit = new AmplificationCircuit(program, amplifiers);
            results.push(circuit.runCircuit(0, phaseSettings[i]));
          }
          resolve(Math.max(...results));
        }
      });
      filereader.read();
    });
  }
}

module.exports = Puzzle71;
