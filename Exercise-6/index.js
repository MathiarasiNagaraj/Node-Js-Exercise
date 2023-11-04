const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const corsOptions = require('./config/CorsConfig');
const LOGGER = require('./logger');
const { TASK_ROUTE, USER_ROUTE } = require('./constants/route-constants');
const port = process.env.PORT
const USER_ROUTE_HANDLER = require('./routes/userRoutes');
const TASK_ROUTE_HANDLER = require('./routes/taskRoutes');




// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
//CORS  MIDDLEWARE
app.use(cors(corsOptions));

//ROUTES HANDLING MIDDLEWARE
app.use(USER_ROUTE.base, USER_ROUTE_HANDLER)


app.use(TASK_ROUTE.base,TASK_ROUTE_HANDLER)


app.listen(port, () => {
    LOGGER.info(`INFO Server started successfully and listening to port: ${port}`);
})




