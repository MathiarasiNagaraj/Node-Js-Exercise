const { readFile, writeFile } = require("fs");
const {
  FILE_CREATE_ERROR,
  FILE_READ_ERROR,
} = require("../constants/error-constants");

const readBuddiesFile = async (path) => {
  return readFile(path, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      console.error(FILE_READ_ERROR, err);
      throw err;
    });
};
const writeBuddiesFile = (path, data) => {
  writeFile(path, data, (err) => {
    if (err) {
      console.log(FILE_CREATE_ERROR);
    }
  });
};

module.exports = {
  readBuddiesFile,
  writeBuddiesFile,
};
