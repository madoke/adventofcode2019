const OrbitChecksum = require("./index");

let checksum;

beforeEach(() => {
  checksum = new OrbitChecksum();
});

test("correctly parses orbital relationship", () => {
  const relationship = "AAA)BBB";
  const expectedParsedRelationship = {"BBB":"AAA"}
  expect(checksum.parseRelationship(relationship)).toEqual(expectedParsedRelationship);
});

test("correctly counts relationships", () => {
  const parsedRelationships = {"BBB" : "AAA", "CCC": "BBB"};
  expect(checksum.countRelationships(parsedRelationships)).toBe(3);
});

test("correctly loads from file, parses and counts relationships", async () => {
  await expect(checksum.run(__dirname + "/input.test.txt")).resolves.toEqual(
    42
  );
});
