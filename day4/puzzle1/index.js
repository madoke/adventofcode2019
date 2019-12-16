const FileReader = require("../../utils/filereader");
const { getDigit, getDigitCount } = require("../../utils/digits");

class Passwordcracker {
  parseInput(input) {
    try {
      const numbers = input.trim().split("-");
      return {
        start: parseInt(numbers[0]),
        stop: parseInt(numbers[1])
      };
    } catch (e) {
      throw new Error(`Error parsing input. ${e.message}`);
    }
  }

  is6Digit(number) {
    return getDigitCount(number) === 6;
  }

  isWithinRange(start, stop, number) {
    return number >= start && number <= stop;
  }

  has2AdjactentDigits(number) {
    const digitCount = getDigitCount(number);
    for (let i = 1; i < digitCount; i++) {
      if (getDigit(number, i) === getDigit(number, i + 1)) {
        return true;
      }
    }
    return false;
  }

  neverDecreaseLR(number) {
    const digitCount = getDigitCount(number);
    for (let i = 1; i < digitCount; i++) {
      if (getDigit(number, i) < getDigit(number, i + 1)) {
        return false;
      }
    }
    return true;
  }

  matchesAllCriteria(start, stop, number) {
    return (
      this.neverDecreaseLR(number) &&
      this.has2AdjactentDigits(number) &&
      this.is6Digit(number) &&
      this.isWithinRange(start, stop, number)
    );
  }

  countMatchesBetween(start, stop) {
    let counter = 0;
    for (let i = start; i <= stop; i++) {
      if (this.matchesAllCriteria(start, stop, i)) {
        counter++;
      }
    }
    return counter;
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

module.exports = Passwordcracker;
