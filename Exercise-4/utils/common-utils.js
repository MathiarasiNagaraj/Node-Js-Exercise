const { BUDDY_VALIDATION_ERROR } = require("../constants/error-constants");

/**
 * @author Mathiarasi
 * @description Validation function for validating Buddy input
 * @param {*} data Buddy data
 * @returns status and validation message
 */

const BUDDY_VALIDATION = (data) => {
  const errorMessages = [];
  let status = true;
  let message = "";
  // Validate realName and nickName
  if (
    typeof data.realName !== "string" ||
    (data.realName.trim().length < 2 && !/^[a-zA-Z]{2,}$/.test(data.realName))
  ) {
    errorMessages.push(BUDDY_VALIDATION_ERROR.realName);
  }
  if (
    typeof data.nickName !== "string" ||
    (data.nickName.trim().length < 2 && !/^[a-zA-Z]{2,}$/.test(data.realName))
  ) {
    errorMessages.push(BUDDY_VALIDATION_ERROR.nickName);
  }

  // Validate dob
  const dob = new Date(data.dob);
  if (isNaN(dob) || dob > new Date()) {
    errorMessages.push(BUDDY_VALIDATION_ERROR.dob);
  }

  if (data.hobbies.length === 0) {
    errorMessages.push(BUDDY_VALIDATION_ERROR.hobbies);
  }

  const errorMessageString = errorMessages.join("\n");

  if (errorMessageString.length > 0) {
    status = false;
    message = errorMessages;
    console.log("Validation Errors:");
    console.log(errorMessageString);
  }
  return { status, message };
};
module.exports = {
  BUDDY_VALIDATION,
};
