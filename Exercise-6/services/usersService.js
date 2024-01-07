const { USER_FILE_PATH } = require("../constants/common-constants");
const {
  USER_ERROR_RESPONSE,
  USER_SUCCESS_RESPONSE,
} = require("../constants/response-constants");
const FILE_UTILS = require("../utils/file.utils");
const bcrypt = require("bcrypt");
const {
  getJWTAccessToken,
  getJWTRefreshToken,
} = require("../utils/auth.utils");
require("dotenv").config();

/**
 * @author Mathiarasi
 * @param {*} newuser new user object with userName and password
 * @description  register Service for registering the user
 * @returns response and status code after registering user or throws error
 */

const registerService = async (newuser) => {
  try {
    const users = await FILE_UTILS.readFileData(USER_FILE_PATH);
    const isExists = users.some((user) => user.userName === newuser.userName);
    if (isExists)
      return {
        status: false,
        statusCode: 409,
        data: USER_ERROR_RESPONSE.alreadyExists(newuser.userName),
      };

    const hashedPassword = await bcrypt.hash(newuser.password, 10);
    users.push({ userName: newuser.userName, password: hashedPassword });

    await FILE_UTILS.writeFileData(USER_FILE_PATH, JSON.stringify(users));
    return {
      status: true,
      statusCode: 201,
      data: USER_SUCCESS_RESPONSE.registerUser(newuser.userName),
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: USER_ERROR_RESPONSE.registerUser(newuser.userName) + err.message,
    };
  }
};
/**
 * @author Mathiarasi
 * @description  login Service for logging In the user
 */
const loginService = async (existingUser) => {
  try {
    const users = await FILE_UTILS.readFileData(USER_FILE_PATH);
    const user = users.find((user) => user.userName === existingUser.userName);
    if (!user)
      return {
        status: false,
        statusCode: 404,
        data: USER_ERROR_RESPONSE.usernotFound(existingUser.userName),
      };
      
    const isMatching = await bcrypt.compare(
      existingUser.password,
      user.password
    );

    if (isMatching) {
      const accessToken = getJWTAccessToken({
        userName: existingUser.userName,
      });
      const refreshToken = getJWTRefreshToken({
        userName: existingUser.userName,
      });

      // Saving refreshToken with current user
      const otherUsers = users.filter(
        (data) => data.userName !== existingUser.userName
      );
      const currentUser = { ...user, refreshToken };

      otherUsers.push(currentUser);

      await FILE_UTILS.writeFileData(USER_FILE_PATH, JSON.stringify(otherUsers));
      return {
        status: true,
        statusCode: 200,
        data: USER_SUCCESS_RESPONSE.loginUser(existingUser.userName),
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } else {
      return {
        status: false,
        statusCode: 401,
        data: USER_ERROR_RESPONSE.invalidPassword,
      };
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: USER_ERROR_RESPONSE.loginUser(existingUser.userName) + err.message,
    };
  }
};

/**
 * @author Mathiarasi
 * @description  logout Service for logging out  the user
 * @returns
 */
const logoutService = async () => {
  try {
    const users = await FILE_UTILS.readFileData(USER_FILE_PATH);
    const isExists = users.some((user) => user.userName === newuser.userName);
    if (isExists)
      return {
        status: false,
        statusCode: 409,
        data: USER_ERROR_RESPONSE.alreadyExists(newuser.userName),
      };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: USER_ERROR_RESPONSE.loginUser(newuser.userName) + err.message,
    };
  }
};

/**
 * @author Mathiarasi
 * @description  refresh token Service for providing refresh token
 * @returns
 */
const refreshTokenService = async () => {
  try {
  } catch (err) {}
};
module.exports = {
  loginService,
  registerService,
  logoutService,
  refreshTokenService,
};
