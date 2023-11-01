const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const corsOptions = require('./config/corsOptions');
const { writeBuddiesFile } = require("./utils/file.utils");
const { DATA_FILE_PATH } = require("./constants/common-contants");
dotenv.config();
const PORT = process.env.PORT;

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a new file with an empty array on server startup


// route handler for buddies
app.use('/', require('./routes/api/buddiesRoutes'));

app.listen(PORT, () => {
   writeBuddiesFile(DATA_FILE_PATH, JSON.stringify([]))
  console.log(`Server listening to ${PORT} and file created`);
});
