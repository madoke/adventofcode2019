const ProgramRunner = require("./index");

let runner;

beforeEach(() => {
  runner = new ProgramRunner();
});

test("program executes correctly", () => {
  const program = "1,9,10,3,2,3,11,0,99,30,40,50";
  const result = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
  expect(runner.runProgram(program)).toEqual(result);
});

test("program with 1202 alarm executes correctly", () => {
  const program = "1,9,10,3,2,3,11,0,99,30,40,50,22";
  const result = [1200, 12, 2, 24, 2, 3, 11, 0, 99, 30, 40, 50, 22];
  expect(runner.runProgramWith1202Alarm(program)).toEqual(result);
});

test("correctly reads the file and executes the program", async () => {
  await expect(runner.run(__dirname + "/input.test.txt")).resolves.toEqual(
    2890696
  );
});
