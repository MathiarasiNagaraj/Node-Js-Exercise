const { writeFile, readFile } = require("node:fs/promises");
const { createReadStream, createWriteStream } = require("node:fs");
const { join } = require("node:path");
const {
  WRITE_ERROR,
  WRITE_SUCCESS,
  READ_ERROR,
} = require("./constants/Error-Constant");



const writeData = async (data) => {
  await writeFile("./randomized_color_palette.json", data).then((err) => {
    if (err) {
      console.log(WRITE_ERROR);
    } else {
      console.log(WRITE_SUCCESS);
    }
  });
};

const readData = async () => {
  const filePath = join("./randomized_color_palette.json");
  readFile(filePath, "utf-8").then((data, err) => {
    if (err) {
      console.log(READ_ERROR);
    } else {
      return JSON.parse(data);
    }
  });
};

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

const readJSON = async () => {
  const filePath = "./color_palatte.json";
  const content = await readFile(filePath, "utf-8");
  return JSON.parse(content);
};

module.exports = {
  writeData,
  readData,
  readJSON,
  writeDataStream,
};
