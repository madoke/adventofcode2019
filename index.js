const { sumFuels } = require("./day1/puzzle1");
const { sumFuelFuels } = require("./day1/puzzle2");
const { runIntcode } = require("./day2/puzzle1");
const { searchInputs } = require("./day2/puzzle2");
const { Wiretracker } = require("./day3/puzzle1");

// sumFuels(__dirname + "/day1/puzzle1/input.txt").then(r => console.log(r));
// sumFuelFuels(__dirname + "/day1/puzzle2/input.txt").then(r => console.log(r));
// runIntcode(__dirname + "/day2/puzzle1/input.txt").then(r => console.log(r));
// searchInputs(__dirname + "/day2/puzzle2/input.txt").then(r => console.log(r));
new Wiretracker().run(__dirname + "/day3/puzzle1/input.txt").then(r => console.log(r));
