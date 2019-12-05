const LineReader = require("../../utils/linereader");
const { calculateFuel } = require("../puzzle1");

const calculateFuelFuel = mass => {
  let totalFuel = 0;
  for (let fuel = calculateFuel(mass); fuel > 0; fuel = calculateFuel(fuel)) {
    totalFuel += fuel;
  }
  return totalFuel;
};

const sumFuelFuels = inputFilePath => {
  return new Promise(function(resolve, _) {
    let totalFuel = 0;
    const linereader = new LineReader({
      inputFilePath,
      onLine: line => {
        totalFuel += calculateFuelFuel(parseFloat(line));
      },
      onClose: () => {
        resolve(totalFuel);
      }
    });
    linereader.read();
  });
};

module.exports = {
  calculateFuelFuel,
  sumFuelFuels
};
