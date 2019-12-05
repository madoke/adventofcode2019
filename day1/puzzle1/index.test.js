const { calculateFuel, sumFuels } = require("./index");

test("correctly calculate fuel", () => {
  expect(calculateFuel(12)).toBe(2);
  expect(calculateFuel(14)).toBe(2);
  expect(calculateFuel(1969)).toBe(654);
  expect(calculateFuel(100756)).toBe(33583);
});

test("correctly read file and sum calculated fuels", async () => {
  await expect(sumFuels(__dirname + "/input.test.txt")).resolves.toEqual(
    2 + 2 + 654 + 33583
  );
});
