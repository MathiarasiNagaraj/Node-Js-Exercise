const { USER_ERROR_RESPONSE } = require("../constants/response-constants");
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
  const { userName, password } = req.body;
  const isValidated = USER_VALIDATION(req.body);
  if (!isValidated.status) {
    res.status(400).send({ message: isValidated.message});
  } else {
    const response = await userServices.registerService(req.body);
    if (response.status) {
      res.status(response.statusCode).send({ message: response.data });
    } else {
      LOGGER.error(
        `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
      );
      res.status(response.statusCode).send({ message: response.data });
    }
  }
};
/**
 * @author Mathiarasi
 * @description  login controller for logging In the user
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 */
const loginController = async (req, res) => {
  LOGGER.info(`INFO IP:${req.ip}, URL:${req.url}`);
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).send({ message: USER_ERROR_RESPONSE.invalidInput });
  }
  else {
    const response = await userServices.loginService(req.body);
    if (response.status) {
      const accessToken = response.accessToken
      res.cookie('jwt', response.refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(response.statusCode).json({ accessToken, message: response.data });
    } else {
      LOGGER.error(
        `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
      );
      res.status(response.statusCode).send({ message: response.data });
    }
  }
};

/**
 * @author Mathiarasi
 * @description  logout controller for logging out  the user
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns
 */
const logoutController = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    res.status(400).send({ message: USER_ERROR_RESPONSE.invalidInput });
  const response = await userServices.logoutService(req.body);
   if (response.status) {
      res.status(response.statusCode).send({ message: response.data });
    } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};

/**
 * @author Mathiarasi
 * @description  refresh token controller for providing refresh token
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns
 */
const refreshTokenController = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    res.status(400).send({ message: USER_ERROR_RESPONSE.invalidInput });
  const response = await userServices.refreshTokenService(req.body);
   if (response.status) {
      res.status(response.statusCode).send({ message: response.data });
    } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};
module.exports = {
  loginController,
  registerController,
  logoutController,
  refreshTokenController,
};
