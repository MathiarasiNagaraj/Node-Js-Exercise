const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const { writeBuddiesFile } = require("./utils/fileUtils");
const { FILE_CREATE_ERROR } = require("./constants/error-constants");
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const filePath = path.join("/modal", "cdw_ace23_buddies.json");

// route handler for buddies
app.use('/', require('./routes/api/buddiesRoutes'));

//while receiving new request to 3000 file should overwrite
app.listen(PORT, () => {
  writeBuddiesFile(filePath, JSON.stringify([]), (err) => {
    if (err) {
      console.log(FILE_CREATE_ERROR);
    }
  });
  console.log(`server listning to ${PORT}`);
});
