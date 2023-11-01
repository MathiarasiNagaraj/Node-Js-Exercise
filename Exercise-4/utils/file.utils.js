const { writeFile, readFile } = require("node:fs/promises");
const {
  FILE_CREATE_ERROR,
  FILE_READ_ERROR,
} = require("../constants/error-constants");
const LOGGER = require("../logger");

/**
 * @description function for reading file content 
 * @param {*} path file path
 * @returns file data in JSON
 */
const readBuddiesFile = async (path) => {
  return readFile(path, "utf-8").then((data, err) => {
    if (err) {
      LOGGER.error(FILE_READ_ERROR);
    } else {
      return JSON.parse(data);
    }
  });
};
/**
 * @description function for writing file content
 * @param {*} path  file path
 * @param {*} data  data need to be written in file
 */
const writeBuddiesFile = async (path, data) => {
  await writeFile(path, data).then((err) => {
    if (err) {
      LOGGER.error(FILE_CREATE_ERROR, err);
    }
  });
};

module.exports = {
  readBuddiesFile,
  writeBuddiesFile,
};
