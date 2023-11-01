const http = require("node:http");
const { readJSON } = require("../Exercise-1/fileUtil");

/**
 * @description  Handles incoming HTTP requests and responds with a randomized array of data
 * @param {*} req The HTTP request object.
 * @param {*} res The HTTP response object.
 */
const requestListener = async (req, res) => {
  console.log("Request is Incoming");
  const responseData = await readJSON();
  //randomizing the data
  const shuffleColors = responseData.slice().sort(() => Math.random() - 0.5);
  //slicing the data
  const random5Colors = shuffleColors.slice(0, 6);
  //sending  the randomized array as response 
  res.end(JSON.stringify(random5Colors));
};
const server = http.createServer(requestListener);
server.listen(3000, () => {
  console.log("port listning in 3000");
});
