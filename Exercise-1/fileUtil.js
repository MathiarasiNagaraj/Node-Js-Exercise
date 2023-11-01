const { writeFile, readFile } = require("node:fs/promises");
const { createReadStream, createWriteStream } = require("node:fs");
const {
  WRITE_ERROR,
  WRITE_SUCCESS,
  READ_ERROR,
} = require("./constants/Error-Constant");

/**
 * @author Mathiarasi
 * @description function for writing data in file
 * @param {*} data data need to be written on file
 */
const writeData = async (path, data) => {
  await writeFile(path, data).then((err) => {
    if (err) {
      console.log(WRITE_ERROR);
    } else {
      console.log(WRITE_SUCCESS);
    }
  });
};

/**
 * @author Mathiarasi
 * @description function for reading data in file
 */
const readData = async (path) => {
  const data = await readFile(path, "utf-8").then((data, err) => {
    if (err) {
      console.log(READ_ERROR);
    } else {
      return JSON.parse(data);
    }
  });
  return data;
};

/**
 * @author Mathiarasi
 * @description function for writing data in file in streams
 *
 */
const writeDataStream = () => {
  const readableStream = createReadStream("./color_palatte.json", {
    encoding: "utf8",
    highWaterMark: 12,
  });
  const writeableStream = createWriteStream("./color_palatte_stream.json");
  readableStream.on("data", (chunk) => {
    writeableStream.write(chunk);
  });
};

module.exports = {
  writeData,
  readData,
  writeDataStream,
};
