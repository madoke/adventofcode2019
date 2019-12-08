/**
 * Builds the path for a puzzle imput, given a day number and a puzzle id
 * @param {the day of month} day
 * @param {the puzzle id} puzzle
 */
const buildInputPath = (day, puzzle) => {
  return `./day${day}/puzzle${puzzle}/input.txt`;
};

/**
 * Builds the path for a puzzle solution module, given a day number and a puzzle id
 * @param {the day of month} day
 * @param {the puzzle id} puzzle
 */
const buildModulePath = (day, puzzle) => {
  return `./day${day}/puzzle${puzzle}`;
};

/**
 * Loads a node module from the folder dayX/puzzleX, containing the solution for that puzzle
 * @param {the path of the module to load} modulePath
 */
const getModule = modulePath => {
  let m;
  try {
    m = require(modulePath);
  } catch (e) {
    if (e.code !== "MODULE_NOT_FOUND") {
      throw e;
    } else {
      console.log(`Unable to find puzzle solution`);
      return;
    }
  }
  return m;
};

/**
 * Parses the command line arguments
 */
const getProgramArgs = () => {
  if (process.argv.length !== 4) {
    console.log("Usage: node index.js <day> <puzzle>");
    return;
  }
  if (!process.argv[2].match(/\d/)) {
    console.log("Invalid argument: day - Should be an integer");
    return;
  }
  if (!process.argv[3].match(/\d/)) {
    console.log("Invalid argument: puzzle - Should be an integer");
    return;
  }
  return { day: process.argv[2], puzzle: process.argv[3] };
};

const run = () => {
  const args = getProgramArgs();
  if(!args) return;
  const modulePath = buildModulePath(args.day, args.puzzle);
  const puzzleModule = getModule(modulePath);
  if(!puzzleModule) return;
  const inputPath = buildInputPath(args.day, args.puzzle);
  new puzzleModule().run(inputPath).then(r => console.log(r));
};

run();
