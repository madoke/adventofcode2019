const Wiretracker = require("./index");
const { p } = require('../../utils/point')

test("successfully gets the manhattan distance between 2 points", () => {
  const p1 = p(3,4);
  const p2 = p(5,10);
  const tracker = new Wiretracker();
  expect(tracker.manhattanDistance(p1,p2)).toBe(8);
});

test("successfully moves a point in the right direction", () => {
  const origin = p(0,0);
  const tracker = new Wiretracker();
  expect(tracker.move(origin, 'R')).toEqual(p(1,0));
  expect(tracker.move(origin, 'L')).toEqual(p(-1,0));
  expect(tracker.move(origin, 'U')).toEqual(p(0,1));
  expect(tracker.move(origin, 'D')).toEqual(p(0,-1));
});

test("successfully gets all intersections between 2 wires, starting a 0,0", () => {
  const wire1 = ['R8','U5','L5','D3'];
  const wire2 = ['U7','R6','D4','L4'];
  const tracker = new Wiretracker();
  tracker.track('wire1', p(0,0), wire1);
  tracker.track('wire2', p(0,0), wire2);
  expect(tracker.intersections).toEqual(expect.arrayContaining([p(3,3),p(6,5),p(0,0)]));
});

test("successfully gets the closest intersection between 2 wires, starting at 0,0", () => {
  const wire1 = ['R8','U5','L5','D3'];
  const wire2 = ['U7','R6','D4','L4'];
  const tracker = new Wiretracker();
  tracker.track('wire1', p(0,0), wire1);
  tracker.track('wire2', p(0,0), wire2);
  expect(tracker.closestIntersection(p(0,0))).toBe(6);
});

test("successfully loads wires from a file, and calculates the correct distance", async () => {
  const tracker = new Wiretracker();
  await expect(tracker.run(__dirname + "/input.test.txt")).resolves.toBe(6);
});
