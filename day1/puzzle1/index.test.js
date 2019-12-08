const FuelCalculator = require("./index");

let calculator;

beforeEach(() => {
  calculator = new FuelCalculator();
});

test("correctly calculate fuel", () => {
  expect(calculator.calculateFuel(12)).toBe(2);
  expect(calculator.calculateFuel(14)).toBe(2);
  expect(calculator.calculateFuel(1969)).toBe(654);
  expect(calculator.calculateFuel(100756)).toBe(33583);
});

test("correctly read file and sum calculated fuels", async () => {
  await expect(calculator.run(__dirname + "/input.test.txt")).resolves.toEqual(
    2 + 2 + 654 + 33583
  );
});
