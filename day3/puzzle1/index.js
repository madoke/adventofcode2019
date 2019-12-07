const LineReader = require("../../utils/linereader");

const p = (x, y) => ({ x, y });

class Wiretracker {
  constructor() {
    this.wires = {};
  }

  manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }

  move(currentPosition, direction) {
    switch (direction) {
      case "R":
        return p(currentPosition.x + 1, currentPosition.y);
      case "L":
        return p(currentPosition.x - 1, currentPosition.y);
      case "U":
        return p(currentPosition.x, currentPosition.y + 1);
      case "D":
        return p(currentPosition.x, currentPosition.y - 1);
    }
  }

  track(wireId, origin, wire) {
    let currentPosition = origin;
    const result = [];
    for (const i in wire) {
      const action = wire[i];
      const direction = action.slice(0, 1);
      const value = parseInt(action.slice(1));
      for (let i = 0; i < value; i++) {
        currentPosition = this.move(currentPosition, direction);
        result.push(currentPosition);
      }
    }
    this.wires[wireId] = result;
  }

  closestIntersection(origin, w1, w2) {
    const wire1 = this.wires[w1];
    const wire2 = this.wires[w2];
    const intersections = wire1.filter(p1 =>
      wire2.some(p2 => p1.x === p2.x && p1.y === p2.y)
    );
    const distances = intersections.map(i => this.manhattanDistance(origin, i));
    return Math.min(...distances);
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      let lineCount = 0;
      const linereader = new LineReader({
        inputFilePath,
        onLine: line => {
          that.track(lineCount++, p(0, 0), line.trim().split(","));
        },
        onClose: () => {
          resolve(that.closestIntersection(p(0, 0), 0, 1));
        }
      });
      linereader.read();
    });
  }
}

module.exports = { Wiretracker, p };
