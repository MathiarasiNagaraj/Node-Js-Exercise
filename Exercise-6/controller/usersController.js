const LOGGER = require("../logger");
const userServices = require("../services/usersService");
const { USER_VALIDATION } = require("../utils/common.util");



/**
 * @author Mathiarasi
 * @description  register controller for registering the user
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns 
 */
const registerController = async (req, res) => {
    LOGGER.info(`INFO IP:${req.ip}, URL:${req.url}`);
    

};
/**
 * @author Mathiarasi
 * @description  login controller for logging In the user
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 */
const loginController = async (req, res) => {

};

/**
 * @author Mathiarasi
 * @description  logout controller for logging out  the user
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns 
 */
const logoutController = async (req, res) => {
    
}

/**
 * @author Mathiarasi
 * @description  refresh token controller for providing refresh token
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns 
 */
const refreshTokenController = async (req, res) => {
    
}
module.exports = {
    loginController,
    registerController,
    logoutController,
    refreshTokenController
};