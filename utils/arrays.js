function permutations(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i++) {
    let rest = permutations(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j++) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
}

module.exports = { permutations };
