const { WRITE_FILE, COLOR_FILE_PATH, CUSTOM_FILE_PATH, READ_STREAM_DATA, READ_DATA } = require("./constants/common-constants");
const { READ_ERROR, EMPTY_DATA } = require("./constants/Error-Constant");
const {
  readData,
  writeData,
  writeDataStream,
} = require("./fileUtil");


function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

/**
 * @author Mathiarasi
 * @description Main function for executing read ,write function
 */
const main = async () => {
  try {
    const color_palatte = await readData(COLOR_FILE_PATH);
    if (color_palatte.length >= 1) {
      const shuffleColors = shuffleArray(color_palatte);
      const random5Colors = shuffleColors.slice(0, 6);
      console.log(WRITE_FILE);
      writeData(CUSTOM_FILE_PATH, JSON.stringify(random5Colors));
      console.log(READ_DATA);
      const data = await readData(CUSTOM_FILE_PATH);
      console.log(data)
      console.log(READ_STREAM_DATA);
      writeDataStream();
    }
    else {
      console.log(EMPTY_DATA);
    }
  } catch (e) {
    console.log(READ_ERROR+ e);
  }
};
main();
