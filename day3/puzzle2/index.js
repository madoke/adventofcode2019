const Wiretracker = require("../puzzle1");
const LineReader = require("../../utils/linereader");
const { p } = require("../../utils/point");

class Wiretracker2000 extends Wiretracker {
  stepsToReach(wireId, point) {
    const wirePoints = this.wires[wireId];
    let i;
    for (i = 0; i < wirePoints.length; i++) {
      if (wirePoints[i].equals(point)) {
        return i;
      }
    }
  }

  cheapestIntersection(...wireIds) {
    const intersections = this.intersections;
    const intersectionsSteps = intersections
      .map(i => {
        let totalSteps = 0;
        for (const wireId of wireIds) {
          totalSteps += this.stepsToReach(wireId, i);
        }
        return totalSteps;
      })
      .filter(i => i > 0);

    return Math.min(...intersectionsSteps);
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      let lineCount = 0;
      let lines = [];
      const linereader = new LineReader({
        inputFilePath,
        onLine: line => {
          const wireId = lineCount++;
          lines.push(wireId);
          that.track(wireId, p(0, 0), line.trim().split(","));
        },
        onClose: () => {
          resolve(that.cheapestIntersection(...lines));
        }
      });
      linereader.read();
    });
  }
}

module.exports = Wiretracker2000;
