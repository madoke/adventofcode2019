const Passwordcracker = require("./index");

let cracker;

beforeEach(() => {
  cracker = new Passwordcracker();
});

test("can parse input correctly", () => {
  expect(cracker.parseInput("12345-54321")).toEqual(
    expect.objectContaining({
      start: 12345,
      stop: 54321
    })
  );
});

test("can identify numbers with 6 digits", () => {
  expect(cracker.is6Digit(6543210)).toBe(false);
  expect(cracker.is6Digit(654321)).toBe(true);
  expect(cracker.is6Digit(111111)).toBe(true);
  expect(cracker.is6Digit(65432)).toBe(false);
});

test("can identify numbers within the range", () => {
  expect(cracker.isWithinRange(10, 30, 20)).toBe(true);
  expect(cracker.isWithinRange(10, 30, 5)).toBe(false);
  expect(cracker.isWithinRange(10, 30, 35)).toBe(false);
});

test("can identify numbers with at least 2 equal adjacent digits", () => {
  expect(cracker.has2AdjactentDigits(123455)).toBe(true);
  expect(cracker.has2AdjactentDigits(113455)).toBe(true);
  expect(cracker.has2AdjactentDigits(111111)).toBe(true);
  expect(cracker.has2AdjactentDigits(212112)).toBe(true);
  expect(cracker.has2AdjactentDigits(123456)).toBe(false);
});

test("can identify numbers which decrease from left to right", () => {
  expect(cracker.neverDecreaseLR(123456)).toBe(true);
  expect(cracker.neverDecreaseLR(654321)).toBe(false);
  expect(cracker.neverDecreaseLR(111111)).toBe(true);
  expect(cracker.neverDecreaseLR(111110)).toBe(false);
});

test("can identify numbers that match all of the criteria", () => {
  expect(cracker.matchesAllCriteria(100000, 200000, 111111)).toBe(true);
  expect(cracker.matchesAllCriteria(100000, 200000, 223450)).toBe(false);
  expect(cracker.matchesAllCriteria(100000, 200000, 123789)).toBe(false);
});

test("can count all the numbers that match the criteria within a certain range", () => {
  expect(cracker.countMatchesBetween(111111, 111119)).toBe(9);
});

test("can load the input from the file and determine the solution", async () => {
  await expect(cracker.run(__dirname + "/input.test.txt")).resolves.toBe(9);
});
