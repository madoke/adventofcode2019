class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  equals(p) {
    return this.x === p.x && this.y === p.y;
  }
}

module.exports = {
  Point,
  p: (x, y) => new Point(x, y)
};
