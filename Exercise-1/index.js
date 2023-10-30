const {
  readData,
  writeData,
  readJSON,
  writeDataStream,
} = require("./fileUtil");

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}


const main = async () => {
  const color_palatte = await readJSON();
  const shuffleColors = shuffleArray(color_palatte);
  const random5Colors = shuffleColors.slice(0, 6);
  console.log("Writing data into  custom file");
  writeData(JSON.stringify(random5Colors));
  console.log("Reading data from custom file");
  const data = await readData();
  console.log(data)
  console.log("reading using stream");
  writeDataStream();
};
main();
