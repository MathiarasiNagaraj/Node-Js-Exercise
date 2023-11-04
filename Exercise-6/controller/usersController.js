const LOGGER = require("../logger");
const userServices = require("../services/usersService");
const { USER_VALIDATION } = require("../utils/common.util");



/**
 * @description  register controller for registering the user
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 */
const registerUser = async (req, res) => {
    LOGGER.info(`INFO IP:${req.ip}, URL:${req.url}`);
    
  const newUser = {
      userName: req.body.userName,
      password:req.body.password
  };
  const isIDExists = await CHECK_ID_EXISTENCE(newBuddy.id);
  const isValidated = BUDDY_VALIDATION(newBuddy);
  if (isValidated.status && isIDExists) {
    const response = await buddyServices.createNewBuddy(newBuddy);
    if (response.status) {
      res.status(200).send(response.data);
    } else {
      LOGGER.error(
        `INFO IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${
          response.data
        }`
      );
      res.status(500).send(response.data);
    }
  } else {
    if (!isIDExists) {
      res.status(409).send("ID ALREADY EXISTS");
    } else res.status(400).send(isValidated.message);
  }
};
/**
 * @author Mathiarasi
 * @description  UPDATE function for updating buddy
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 */
const loginUser = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.url}`);
  const updateBuddy = req.body;
  const isValidated = BUDDY_VALIDATION(updateBuddy);
  if (isValidated.status) {
    const response = await buddyServices.updateBuddy(
      req.params.id,
      updateBuddy
    );
    if (response.status) {
      res.status(200).send(response.data);
    } else {
      LOGGER.error(
        `INFO IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${
          response.data
        }`
      );
      res.status(500).send(response.data);
    }
  } else {
    res.status(400).send(isValidated.message);
  }
};

module.exports = {
    loginUser,
    registerUser
};