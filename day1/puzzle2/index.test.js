const { calculateFuelFuel, sumFuelFuels } = require("./index");

test("correctly calculate fuel with added fuel for fuel's weight", () => {
  expect(calculateFuelFuel(12)).toBe(2);
  expect(calculateFuelFuel(14)).toBe(2);
  expect(calculateFuelFuel(1969)).toBe(966);
  expect(calculateFuelFuel(100756)).toBe(50346);
});

test("correctly read file and sum calculated fuels", () => {
  expect(sumFuelFuels(__dirname + "/input.test.txt")).resolves.toEqual(
    2 + 2 + 966 + 50346
  );
});

