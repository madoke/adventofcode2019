const ProgramRunner = require("./index");

let runner;

beforeEach(() => {
  runner = new ProgramRunner();
});

test("correctly reads the file and executes the program", async () => {
  await expect(runner.run(__dirname + "/input.test.txt")).resolves.toEqual(
    4
  );
});
