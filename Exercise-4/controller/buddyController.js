const LOGGER = require("../logger");
const buddyServices = require("../services/buddyServices");
const {
  BUDDY_VALIDATION,
  CHECK_ID_EXISTENCE,
} = require("../utils/common-utils");

/**
 * @author Mathiarasi
 * @description GET ALL BUDDIES function for getting all buddies
 * @param {*} req
 * @param {*} res
 */
const getAllBuddies = async (req, res) => {
  LOGGER.info(`INFO IP:${req.ip}, URL:${req.url}`);
  const response = await buddyServices.getAllBuddies();
  if (response.status) {
    res.status(200).send(response.data);
  } else {
    LOGGER.error(
      `IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${
        response.data
      }`
    );
    res.status(500).send(response.data);
  }
};

/**
 * @description GET function for getting buddy with particular ID
 * @param {*} req
 * @param {*} res
 */

const getBuddyWithId = async (req, res) => {
  LOGGER.info(`INFO IP:${req.ip}, URL:${req.url}`);
  const response = await buddyServices.getBuddyWithId(req.params.id);
  if (response.status) {
    res.status(200).send(response.data);
  } else {
    LOGGER.error(
      `IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${
        response.data
      }`
    );
    res.status(500).send(response.data);
  }
};
/**
 * @description  POST function for creating new buddy
 * @param {*} req
 * @param {*} res
 */
const createNewBuddy = async (req, res) => {
  LOGGER.info(`INFO IP:${req.ip}, URL:${req.url}`);
  const newBuddy = {
    id:
      req.body.realName +
      "_" +
      req.body.dob.split("/")[0] +
      "_" +
      req.body.hobbies[0],
    realName: req.body.realName,
    nickName: req.body.nickName,
    dob: req.body.dob,
    hobbies: req.body.hobbies,
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
      res.status(400).send("ID ALREADY EXISTS");
    } else res.status(400).send(isValidated.message);
  }
};
/**
 * @author Mathiarasi
 * @description  UPDATE function for updating buddy
 * @param {*} req
 * @param {*} res
 */
const updateBuddy = async (req, res) => {
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
/**
 * @author Mathiarasi
 * @description DELETE function for deleting buddy id
 * @param {*} req
 * @param {*} res
 */
const deleteBuddy = async (req, res) => {
  const response = await buddyServices.deleteBuddy(req.params.id);
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
};
/**
 * @author Mathiarasi
 * @description  DELETE ALL function for deleting all buddy
 * @param {*} req
 * @param {*} res
 */
const deleteAllBuddy = async (req, res) => {
  const response = await buddyServices.deleteAllBuddy();
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
};

module.exports = {
  getAllBuddies,
  createNewBuddy,
  updateBuddy,
  getBuddyWithId,
  deleteBuddy,
  deleteAllBuddy,
};
