const LineReader = require("../../utils/linereader");

class FuelCalculator {
  calculateFuel(mass) {
    return Math.floor(mass / 3) - 2;
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      let totalFuel = 0;
      const linereader = new LineReader({
        inputFilePath,
        onLine: line => {
          totalFuel += that.calculateFuel(parseFloat(line));
        },
        onClose: () => {
          resolve(totalFuel);
        }
      });
      linereader.read();
    });
  }
}
module.exports = FuelCalculator;
