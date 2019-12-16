const { getDigit, getDigitCount } = require("./digits");

test("getDigitCount correctly counts digits", () => {
  expect(getDigitCount(1000)).toBe(4);
  expect(getDigitCount(1)).toBe(1);
  expect(getDigitCount(10)).toBe(2);
  expect(getDigitCount(-100)).toBe(3);
});

test("getDigit correctly gets the nth digit", () => {
  expect(getDigit(1002, 1)).toBe(2);
  expect(getDigit(20003, 1)).toBe(3);
  expect(getDigit(10023, 2)).toBe(2);
  expect(getDigit(100, 3)).toBe(1);
  expect(getDigit(100, 5)).toBe(0);
});
