const Passwordcracker2000 = require("./index");

let cracker;

beforeEach(() => {
  cracker = new Passwordcracker2000();
});

test("can identify isolated groups of 2 digits", () => {
  expect(cracker.hasIsolatedGroupOf2Digits(111122)).toBe(true);
  expect(cracker.hasIsolatedGroupOf2Digits(123444)).toBe(false);
  expect(cracker.hasIsolatedGroupOf2Digits(111111)).toBe(false);
  expect(cracker.hasIsolatedGroupOf2Digits(113456)).toBe(true);
});

test("can identify numbers that match all of the criteria", () => {
  expect(cracker.matchesAllCriteria(100000, 200000, 112233)).toBe(true);
  expect(cracker.matchesAllCriteria(100000, 200000, 111122)).toBe(true);
  expect(cracker.matchesAllCriteria(100000, 200000, 123444)).toBe(false);
});

test("can count all the numbers that match the criteria within a certain range", () => {
  expect(cracker.countMatchesBetween(111111, 111123)).toBe(1);
});

test("can load the input from the file and determine the solution", async () => {
  await expect(cracker.run(__dirname + "/input.test.txt")).resolves.toBe(1);
});
