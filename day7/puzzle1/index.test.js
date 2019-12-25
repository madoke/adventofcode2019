const Puzzle71 = require('./index');

test("correctly loads from file, parses and counts steps", async () => {
  const circuit = new Puzzle71();
  await expect(circuit.run(__dirname + "/input.test.txt")).resolves.toEqual(
    43210
  );
});

