const { USER_FILE_PATH } = require("../constants/common-constants");
const { USER_ERROR_RESPONSE, USER_SUCCESS_RESPONSE } = require("../constants/response-constants");
const { writeFileData ,readFileData} = require("../utils/file.utils");


/**
 * @author Mathiarasi
 * @description  register Service for registering the user
 * @returns 
 */
const registerService = async () => {
   
    try {
    } catch (err) {}

};
/**
 * @author Mathiarasi
 * @description  login Service for logging In the user
 */
const loginService = async () => {
    try {
    } catch (err) {}
};

/**
 * @author Mathiarasi
 * @description  logout Service for logging out  the user
 * @returns 
 */
const logoutService = async () => {
    try {
    } catch (err) {}
}

/**
 * @author Mathiarasi
 * @description  refresh token Service for providing refresh token
 * @returns 
 */
const refreshTokenService = async () => {
    try {
    } catch (err) {}
}
module.exports = {
    loginService,
    registerService,
    logoutService,
    refreshTokenService
};