class AmplificationCircuit {
  constructor(program, amplifiers) {
    this.amplifiers = amplifiers || [];
    this.program = program || [];
  }

  runCircuit(input, phaseSettingSequence) {
    let result = [input];
    for (let i = 0; i < this.amplifiers.length; i++) {
      const phaseSetting = phaseSettingSequence[i];
      const amplifier = this.amplifiers[i];
      result = amplifier.runProgram(this.program, [phaseSetting, ...result]);
    }
    return result[0];
  }
}

module.exports = AmplificationCircuit;
