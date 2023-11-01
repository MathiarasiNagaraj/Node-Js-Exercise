const { writeFile, readFile } = require("node:fs/promises");
const {
  FILE_CREATE_ERROR,
  FILE_READ_ERROR,
} = require("../constants/error-constants");

const readBuddiesFile = async (path) => {
  
  return readFile(path, "utf-8").then((data, err) => {
    if (err) {
      console.log(FILE_READ_ERROR);
    } else {
      return JSON.parse(data);
    }
  });

};
const writeBuddiesFile = async(path, data) => {
  await writeFile(path, data).then((err) => {
    if (err) {
    }
  });
};

module.exports = {
  readBuddiesFile,
  writeBuddiesFile,
};
