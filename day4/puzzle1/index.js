const FileReader = require("../../utils/filereader");

class Passwordcracker {
  getDigit(number, n) {
    return Math.floor((number / Math.pow(10, n - 1)) % 10);
  }

  getDigitCount(number) {
    return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
  }

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
    return this.getDigitCount(number) === 6;
  }

  isWithinRange(start, stop, number) {
    return number >= start && number <= stop;
  }

  has2AdjactentDigits(number) {
    const digitCount = this.getDigitCount(number);
    for (let i = 1; i < digitCount; i++) {
      if (this.getDigit(number, i) === this.getDigit(number, i + 1)) {
        return true;
      }
    }
    return false;
  }

  neverDecreaseLR(number) {
    const digitCount = this.getDigitCount(number);
    for (let i = 1; i < digitCount; i++) {
      if (this.getDigit(number, i) < this.getDigit(number, i + 1)) {
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
    for(let i = start; i <= stop; i++) {
      if(this.matchesAllCriteria(start, stop, i)) {
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
          console.log(input);
          resolve(that.countMatchesBetween(input.start, input.stop));
        }
      });
      filereader.read();
    });
  }
}

module.exports = Passwordcracker;
