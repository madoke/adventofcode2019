const OrbitChecksum2000 = require("./index");

let checksum, parsedRelationships;

beforeEach(() => {
  checksum = new OrbitChecksum2000();
  parsedRelationships = {"B" : "A", "C": "B", "D": "B", "E": "C"};
});

test("can get the node chain from the source to a specific node", () => {
  expect(checksum.getChain(parsedRelationships, "E")).toEqual(["E","C","B","A"]);
});

test("can get the a subchain between two nodes", () => {
  expect(checksum.getChain(parsedRelationships, "C","B")).toEqual(["C","B"]);
});

test("can find closest common node", () => {
  let chainA = ["E", "C", "B", "A"];
  let chainB = ["D", "B", "A"];
  expect(checksum.closestCommonNode(chainA, chainB)).toBe("B");
});

test("can get the chain between two nodes", () => {
  let chainA = ["E", "C", "B", "A"];
  let chainB = ["D", "B", "A"];
  expect(checksum.getUniqueChains(chainA, chainB, "B")).toEqual({
    uniqueChainA: ["E", "C"],
    uniqueChainB: ["D"]
  });
});

test("correctly loads from file, parses and counts steps", async () => {
  await expect(checksum.run(__dirname + "/input.test.txt")).resolves.toEqual(
    4
  );
});
