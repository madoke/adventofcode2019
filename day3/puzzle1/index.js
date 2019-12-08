const LineReader = require("../../utils/linereader");
const { p } = require("../../utils/point");

class Wiretracker {
  constructor() {
    this.wires = {};
    this.intersections = [];
    this.circuitBoard = {};
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

  markOnCircuitBoard(point, wire) {
    const cb = this.circuitBoard;
    // check if there is a row for x
    if (!cb.hasOwnProperty(point.x)) {
      cb[point.x] = {};
    }
    // check if there is a col for y
    if (!cb[point.x].hasOwnProperty(point.y)) {
      cb[point.x][point.y] = [];
    }
    // increment the occurrences of point x,y
    if (!cb[point.x][point.y].includes(wire)) {
      cb[point.x][point.y].push(wire);
    }
    return cb[point.x][point.y];
  }

  /**
   * Tracks a wire in the internal representation
   * - keeps a map of points where the wire passes
   * - keeps a list of intersections with other wires
   * - keeps an ordered list of every point that composes the wire
   * @param {the wire identifier} wireId
   * @param {the wire starting point} origin
   * @param {the wire string} wire
   */
  track(wireId, origin, wire) {
    let currentPosition = origin;
    // Build an array with the results
    const result = [origin];
    // Check if the origin intersects with other wires
    let wiresInThisPosition = this.markOnCircuitBoard(currentPosition, wire);
    if (wiresInThisPosition.length > 1) {
      this.intersections.push(currentPosition);
    }
    // Iterate tha wire instructions
    for (const i in wire) {
      const action = wire[i];
      const direction = action.slice(0, 1);
      const value = parseInt(action.slice(1));
      for (let i = 0; i < value; i++) {
        currentPosition = this.move(currentPosition, direction);
        result.push(currentPosition);
        let wiresInThisPosition = this.markOnCircuitBoard(
          currentPosition,
          wire
        );
        if (wiresInThisPosition.length > 1) {
          this.intersections.push(currentPosition);
        }
      }
    }
    this.wires[wireId] = result;
  }

  closestIntersection(origin, w1, w2) {
    const distances = this.intersections
      .map(i => this.manhattanDistance(origin, i))
      .filter(i => i > 0);
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

module.exports = Wiretracker;
