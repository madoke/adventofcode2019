const LineReader = require("../../utils/linereader");
const OrbitChecksum = require("../puzzle1");

class OrbitChecksum2000 extends OrbitChecksum {
  constructor() {
    super();
  }

  getChain(parsedRelationships, nodeA, nodeB) {
    let chain = [];
    let orbited = parsedRelationships[nodeA];
    let orbiting = nodeA;
    chain.push(orbiting)
    while (true) {
      chain.push(orbited);
      orbiting = orbited;
      if ((orbited !== nodeB) && parsedRelationships.hasOwnProperty(orbiting)) {
        orbited = parsedRelationships[orbiting];
      } else {
        break;
      }
    }
    return chain;
  }

  closestCommonNode(chainA, chainB) {
    let ia = chainA.length, ib = chainB.length;
    while (--ia >= 0 && --ib >= 0) {
      if (chainA[ia] !== chainB[ib]) {
        break;
      }
    }
    if (chainA[ia + 1] === chainB[ib + 1]) {
      return chainA[ia + 1];
    }
  }

  getUniqueChains(chainA, chainB, closestCommonNode) {
    const indexA = chainA.indexOf(closestCommonNode);
    const indexB = chainB.indexOf(closestCommonNode);
    const uniqueChainA = chainA.slice(0,indexA);
    const uniqueChainB = chainB.slice(0,indexB);
    return { uniqueChainA, uniqueChainB };
  }

  run(inputFilePath) {
    const that = this;
    return new Promise(function(resolve, _) {
      let totalFuel = 0;
      const linereader = new LineReader({
        inputFilePath,
        onLine: line => {
          that.relationships = {
            ...that.relationships,
            ...that.parseRelationship(line)
          };
        },
        onClose: () => {
          const chainA = that.getChain(that.relationships, "YOU");
          const chainB = that.getChain(that.relationships, "SAN");
          const closestCommonNode = that.closestCommonNode(chainA, chainB);
          const uniqueChains = that.getUniqueChains(chainA, chainB, closestCommonNode);
          resolve(uniqueChains.uniqueChainA.length + uniqueChains.uniqueChainB.length - 2);
        }
      });
      linereader.read();
    });
  }
}

module.exports = OrbitChecksum2000;
