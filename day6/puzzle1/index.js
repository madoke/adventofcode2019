const LineReader = require("../../utils/linereader");

class OrbitChecksum {
  constructor() {
    this.relationships = {};
  }

  parseRelationship(relationship) {
    const split = relationship.trim().split(")");
    return { [split[1]]: `${split[0]}` };
  }

  countRelationships(relationships) {
    let count = 0;
    for(let key in relationships) {
      let orbited = relationships[key];
      let orbiting = key;
      while(true) {
        count += 1;
        orbiting = orbited;
        if(relationships.hasOwnProperty(orbiting)) {
          orbited = relationships[orbiting];
        } else {
          break;
        }
      }
    }
    return count
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
          resolve(that.countRelationships(that.relationships));
        }
      });
      linereader.read();
    });
  }
}

module.exports = OrbitChecksum;
