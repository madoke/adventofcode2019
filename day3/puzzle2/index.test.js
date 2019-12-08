const Wiretracker2000 = require("./index");
const { p } = require('../../utils/point');

test("successfully counts the number of steps to reach one point", () => {
  const tracker = new Wiretracker2000();
  const wire1 = ['R8','U5','L5','D3'];
  tracker.track('wire1', p(0,0), wire1);
  expect(tracker.stepsToReach('wire1',p(3,3))).toBe(20);
});

test("successfully determines the intersection which requires less wire steps", () => {
  const tracker = new Wiretracker2000();
  const wire1 = ['R8','U5','L5','D3'];
  const wire2 = ['U7','R6','D4','L4'];
  tracker.track('wire1', p(0,0), wire1);
  tracker.track('wire2', p(0,0), wire2);
  expect(tracker.cheapestIntersection('wire1', 'wire2')).toBe(30);
});

test("successfully loads wires from a file, and calculates the correct steps", async () => {
  const tracker = new Wiretracker2000();
  await expect(tracker.run(__dirname + "/input.test.txt")).resolves.toBe(30);
});
