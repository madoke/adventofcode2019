function getDigit(number, n) {
  return Math.abs(Math.floor((number / Math.pow(10, n - 1)) % 10));
}

function getDigitCount(number) {
  return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
}


module.exports = {
  getDigit, getDigitCount
}
