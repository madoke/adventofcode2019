const fs = require("fs");

class FileReader {
  constructor({ inputFilePath, onContent }) {
    this.inputFilePath = inputFilePath;
    this.onContent = onContent;
  }
  read() {
    const that = this;
    fs.readFile(this.inputFilePath, "utf8", function(err, content) {
      if (err) {
        throw new Error(err);
      }
      that.onContent(content);
    });
  }
}

module.exports = FileReader;
