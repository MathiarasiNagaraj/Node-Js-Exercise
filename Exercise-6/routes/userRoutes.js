const express = require('express');
const { USER_ROUTE } = require('../constants/route-constants');
const router = express.Router();
const userController = require('../controller/usersController');

router.route(USER_ROUTE.register).post(userController.registerController)
router.route(USER_ROUTE.login).post(userController.loginController)
router.route(USER_ROUTE.logout).post(userController.logoutController)
router.route(USER_ROUTE.refresh).get(userController.refreshTokenController)

modules.exports = router;