const FileReader = require("../../utils/filereader");
const Passwordcracker = require("../puzzle1");
const { getDigit, getDigitCount } = require("../../utils/digits");

class Passwordcracker2000 extends Passwordcracker {
  hasIsolatedGroupOf2Digits(number) {
    const digitCount = getDigitCount(number);
    let repeated = 0;
    for (let i = 1; i < digitCount; i++) {
      if (getDigit(number, i) === getDigit(number, i + 1)) {
        repeated += 1;
      } else {
        if (repeated === 1) {
          return true;
        }
        repeated = 0;
      }
    }
    return repeated === 1;
  }

  matchesAllCriteria(start, stop, number) {
    return (
      super.matchesAllCriteria(start, stop, number) &&
      this.hasIsolatedGroupOf2Digits(number)
    );
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      const filereader = new FileReader({
        inputFilePath,
        onContent: content => {
          const input = that.parseInput(content);
          resolve(that.countMatchesBetween(input.start, input.stop));
        }
      });
      filereader.read();
    });
  }
}

module.exports = Passwordcracker2000;
