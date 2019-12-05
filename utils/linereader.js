const readline = require("readline");
const fs = require("fs");

class LineReader {
  constructor({ inputFilePath, onLine, onClose }) {
    this.inputFilePath = inputFilePath;
    this.onLine = onLine;
    this.onClose = onClose;
  }
  read() {
    this.readInterface = readline.createInterface({
      input: fs.createReadStream(this.inputFilePath),
      console: false
    });
    this.readInterface.on("line", line => this.onLine(line));
    this.readInterface.on("close", () => this.onClose());
  }
}

module.exports = LineReader;
