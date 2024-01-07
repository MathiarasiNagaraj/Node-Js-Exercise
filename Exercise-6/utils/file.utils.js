const { writeFile, readFile } = require("node:fs/promises");
const {
  FILE_CREATE_ERROR,
  FILE_READ_ERROR,
} = require("../constants/common-constants");
const LOGGER = require("../logger");
const util = require('util');
/**
 * @description function for reading file content 
 * @param {*} path file path
 * @returns file data in JSON
 */

const readFileData = async (path) => {
  try {
    const data = await readFile(path, "utf-8");
    
    if (!data) {
      // Handle the case when the file is empty
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    LOGGER.error(`FILE ERROR ${FILE_READ_ERROR}`, err);
    throw err; // Re-throw the error to be caught by the calling code
  }
};

/**
 * @description function for writing file content
 * @param {*} path  file path
 * @param {*} data  data need to be written in file
 */
const writeFileData = async (path, data) => {
  
  await writeFile(path, data).then((err) => {
    if (err) {
      LOGGER.error('FILE',FILE_CREATE_ERROR, err);
    }
  });
};

const checkUserExistence = async (path, user) => {
    const users = await readFileData(path);
    return users.some((data) => data.userName === user.userName);
}
module.exports = {
  readFileData,
    writeFileData,
    checkUserExistence
};