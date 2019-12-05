const LineReader = require("../../utils/linereader");

const calculateFuel = mass => {
  return Math.floor(mass / 3) - 2;
};

const sumFuels = (inputFilePath) => {
  return new Promise(function(resolve, _) {
    let totalFuel = 0;
    const linereader = new LineReader({
      inputFilePath,
      onLine: line => {
        totalFuel += calculateFuel(parseFloat(line));
      },
      onClose: () => {
        resolve(totalFuel);
      }
    });
    linereader.read();
  });
};

module.exports = {
  calculateFuel, sumFuels
};
