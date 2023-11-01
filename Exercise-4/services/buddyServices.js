const { writeBuddiesFile, readBuddiesFile } = require("../utils/file.utils");
const { DATA_FILE_PATH } = require("../constants/common-contants");
const { BUDDY_ERROR } = require("../constants/error-constants");

/**
 * @author Mathiarasi
 * @description GET ALL BUDDIES function for getting all buddies
 * @returns all buddy list
 */
const getAllBuddies = async () => {
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    return { status: true, data: existingBuddies };
  } catch (e) {
    return { status: false, data: BUDDY_ERROR.getAll + e };
  }
};

/**
 * @author Mathiarasi
 * @description GET function for getting buddy with particular ID
 * @param {*} id  buddy ID
 * @returns status  and data
 */
const getBuddyWithId = async (id) => {
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    const buddy = existingBuddies.find(
      (buddy) => buddy.id === id || buddy.realName === id
    );

    if (!buddy) {
      return { status: false, data: "BUDDY ID NOT FOUND" };
    }
    return { status: true, data: buddy };
  } catch (e) {
    return { status: false, data: BUDDY_ERROR.get + e };
  }
};

/**
 * @author Mathiarasi
 * @description POST function for creating new buddy
 * @param {*} data buddy data
 * @returns status  and data
 */
const createNewBuddy = async (data) => {
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    existingBuddies.push(data);
    writeBuddiesFile(DATA_FILE_PATH, JSON.stringify(existingBuddies));
    return { status: true, data: `Data added ID:${data.id}` };
  } catch (e) {
    return { status: false, data: BUDDY_ERROR.add + e };
  }
};

/**
 * @author Mathiarasi
 * @description UPDATE function for updating buddy
 * @param {*} id  id of buddy that need to be updated
 * @param {*} data  updated buddy data
 * @returns status  and data
 */
const updateBuddy = async (id, data) => {
  try {
    const updatedbuddy = data;
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);

    const buddy = existingBuddies.find((buddy) => buddy.id === id);

    if (!buddy) {
      return { status: false, data: "BUDDY ID NOT FOUND" };
    }
    const updatedBuddies = existingBuddies.map((buddy) => {
      if (buddy.id == data.id) {
        return {
          ...buddy,
          realName: updatedbuddy.realName,
          nickName: updatedbuddy.nickName,
          dob: updatedbuddy.dob,
          hobbies: updatedbuddy.hobbies,
        };
      }
      return buddy;
    });
    writeBuddiesFile(DATA_FILE_PATH, JSON.stringify(updatedBuddies));
    return { status: true, data: `Data  ID:${id} updated successfully` };
  } catch (e) {
    return { status: false, data: BUDDY_ERROR.update + e };
  }
};

/**
 * @author Mathiarasi
 * @description DELETE function for deleting buddy id
 * @param {*} id  id of buddy that need to be deleted
 * @returns status  and data
 */
const deleteBuddy = async (id) => {
  try {
    const existingBuddies = await readBuddiesFile(DATA_FILE_PATH);
    const buddy = existingBuddies.find((buddy) => buddy.id === id);
    if (!buddy) {
      return { status: false, data: `Buddy ID ${id} not found` };
    }
    const filteredBuddies = existingBuddies.filter((buddy) => buddy.id !== id);
    console.log(filteredBuddies, "data");
    writeBuddiesFile(DATA_FILE_PATH, JSON.stringify(filteredBuddies));
    return { status: true, data: `${id} deleted successfully` };
  } catch (e) {
    return { status: false, data: BUDDY_ERROR.delete + e };
  }
};

/**
 * @author Mathiarasi
 * @description DELETE function for deleting all data
 * @returns status  and data
 */
const deleteAllBuddy = async () => {
  try {
    writeBuddiesFile(DATA_FILE_PATH, JSON.stringify([]));
    return { status: true, data: `ALL BUDDIES DELETED` };
  } catch (e) {
    return { status: false, data: BUDDY_ERROR.delete + e };
  }
};
module.exports = {
  getAllBuddies,
  getBuddyWithId,
  createNewBuddy,
  updateBuddy,
  deleteBuddy,
  deleteAllBuddy,
};
