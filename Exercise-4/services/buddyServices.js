const { v4: uuidv4 } = require("uuid");
const { writeBuddiesFile, readBuddiesFile } = require("../utils/file.utils");
const { DATA_FILE_PATH } = require("../constants/common-contants");
const LOGGER = require("../logger");
const { BUDDY_ERROR } = require("../constants/error-constants");
const getAllBuddies = async (req, res) => {

  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    res.status(200).send({ existingBuddies });
  } catch (e) {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${BUDDY_ERROR.getAll}`);
    res.status(500).send({  data:BUDDY_ERROR.getAll + e });
  }

};
const getBuddyWithId = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    const buddy = existingBuddies.find((buddy) => buddy.id === req.params.id || buddy.realName === req.params.id);
    if (!buddy) {
      return res
        .status(400)
        .send({ data: `Buddy ID ${req.body.id} not found` });
    }
    res.json(buddy);
  }
  catch (e) {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${BUDDY_ERROR.get}`);
    res.status(500).send({  data:BUDDY_ERROR.get + e });
  }

};

const createNewBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip} URL:${req.url}`)

  const newBuddy = {
    id: uuidv4(),
    realName: req.body.realName,
    nickName: req.body.nickName,
    dob: req.body.dob,
    hobbies: req.body.hobbies,
  };
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    existingBuddies.push(newBuddy);
    writeBuddiesFile(DATA_FILE_PATH, JSON.stringify(existingBuddies));
    res.status(201).send({data:`Data added ID:${newBuddy.id}`});
  }
  catch (e) {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${BUDDY_ERROR.add}`);
    res.status(500).send({  data:BUDDY_ERROR.add + e });
  }
};
const updateBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip} URL:${req.url}`)
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    return JSON.stringify(existingBuddies);
  }
  catch (e) {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${BUDDY_ERROR.update}`);
    res.status(500).send({  data:BUDDY_ERROR.update + e });
  }
};
const deleteBuddy = async (req, res) => {
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    const buddy = existingBuddies.find((buddy) => buddy.id === req.body.id);
    if (!buddy) {
      return res
        .status(400)
        .json({ message: `Buddy ID ${req.body.id} not found` });
    }
    const filteredBuddies = existingBuddies.filter(
      (buddy) => buddy.id !== req.body.id
    );
    writeBuddiesFile(DATA_FILE_PATH, JSON.stringify(filteredBuddies));
    res.status(200).send(`${res.body.id} deleted successfully`);
  }catch (e) {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${500}, MESSAGE:${BUDDY_ERROR.delete}`);
    res.status(500).send({  data:BUDDY_ERROR.delete + e });
  }
};

module.exports = {
  getAllBuddies,
  getBuddyWithId,
  createNewBuddy,
  updateBuddy,
  deleteBuddy,
};
