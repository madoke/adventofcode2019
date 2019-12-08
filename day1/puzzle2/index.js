const LineReader = require("../../utils/linereader");
const FuelCalculator = require("../puzzle1");

class FuelCalculator2000 extends FuelCalculator {
  calculateFuelFuel(mass) {
    let totalFuel = 0;
    for (let fuel = super.calculateFuel(mass); fuel > 0; fuel = super.calculateFuel(fuel)) {
      totalFuel += fuel;
    }
    return totalFuel;
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      let totalFuel = 0;
      const linereader = new LineReader({
        inputFilePath,
        onLine: line => {
          totalFuel += that.calculateFuelFuel(parseFloat(line));
        },
        onClose: () => {
          resolve(totalFuel);
        }
      });
      linereader.read();
    });
  }
}

module.exports = FuelCalculator2000;
