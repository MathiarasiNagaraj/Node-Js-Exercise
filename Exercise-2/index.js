const http = require("node:http");
const { readJSON } = require("../Exercise-1/fileUtil");
const requestListener = async (req, res) => {
  console.log("Request is Incoming");
  const responseData = await readJSON();
  const shuffleColors = responseData.slice().sort(() => Math.random() - 0.5);
  const random5Colors = shuffleColors.slice(0, 6);
  res.end(JSON.stringify(random5Colors));
};
const server = http.createServer(requestListener);
server.listen(3000, () => {
  console.log("port listning in 3000");
});
