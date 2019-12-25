const { permutations } = require('./arrays');

test('permutations should generate all possible combinations of array', () => {
  const arr = [0,1,2];
  const all = permutations(arr);
  expect(all).toEqual(expect.arrayContaining([
    [0,1,2],
    [0,2,1],
    [1,0,2],
    [2,0,1],
    [1,2,0],
    [2,1,0]
  ]));
  expect(all.length).toBe(6);
});
