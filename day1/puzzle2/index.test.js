const FuelCalculator2000 = require("./index");

let calculator;

beforeEach(() => {
  calculator = new FuelCalculator2000();
});

test("correctly calculate fuel with added fuel for fuel's weight", () => {
  expect(calculator.calculateFuelFuel(12)).toBe(2);
  expect(calculator.calculateFuelFuel(14)).toBe(2);
  expect(calculator.calculateFuelFuel(1969)).toBe(966);
  expect(calculator.calculateFuelFuel(100756)).toBe(50346);
});

test("correctly read file and sum calculated fuels", () => {
  expect(calculator.run(__dirname + "/input.test.txt")).resolves.toEqual(
    2 + 2 + 966 + 50346
  );
});
