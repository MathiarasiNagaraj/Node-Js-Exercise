const LOGGER = require("../logger");
const buddyServices = require("../services/buddyServices");

/**
 * @author Mathiarasi
 * @description GET ALL BUDDIES function for getting all buddies
 * @param {*} req
 * @param {*} res
 */
const getAllBuddies = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.url}`);
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
  LOGGER.info(`IP:${req.ip}, URL:${req.url}`);
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
  LOGGER.info(`IP:${req.ip}, URL:${req.url}`);
  const newBuddy = {
    id: req.body.realName + "_" + req.body.dob.split("/")[0],
    realName: req.body.realName,
    nickName: req.body.nickName,
    dob: req.body.dob,
    hobbies: req.body.hobbies,
  };
  const response = await buddyServices.createNewBuddy(newBuddy);
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
 * @author Mathiarasi
 * @description  UPDATE function for updating buddy
 * @param {*} req
 * @param {*} res
 */
const updateBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.url}`);
  const response = await buddyServices.updateBuddy(req.params.id,req.body);
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
      `IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${
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
      `IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${
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
