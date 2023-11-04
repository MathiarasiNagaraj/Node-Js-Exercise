const express = require('express');
const { USER_ROUTE } = require('../constants/route-constants');
const router = express.Router();
const userController = require('../controller/usersController');


router.route(USER_ROUTE.register).post(userController.registerUser)
router.route(USER_ROUTE.login).post(userController.loginUser)


modules.exports = router;