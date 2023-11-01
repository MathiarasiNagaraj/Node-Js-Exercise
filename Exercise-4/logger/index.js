const { format, transport, createLogger, transports } = require("winston");
const { combine, timestamp, colorize, printf, errors, json } = format;
require("dotenv").config();
const logformat = printf(({  message, timestamp, stack }) => {
  return ` ${message || stack} ${timestamp} `;
});
/**
 * Creates a winston logger
 * @param {string} loggerLevel - level of log to be allowed in file
 * @param {*} logpath - path of file for the logs
 * @returns - a winston logger
 */
const CUSTOM_LOGGER = (loggerlevel, logpath) =>
  createLogger({
    level: loggerlevel,
    format: combine(
      colorize(),
      timestamp(),
      errors({ stack: true }),
      json(),
      logformat
    ),
    transports: [
      new transports.File({
        filename: logpath,
      }),
    ],
  });

const INFO_LOGGER = CUSTOM_LOGGER(0, "./logs/info.log");
const ERROR_LOGGER = CUSTOM_LOGGER(0, "./logs/error.log");

/**
 * LOGGER Object with info and error function
 */
const LOGGER = {
  info: (params) => INFO_LOGGER.info(params),
  error: (params) => ERROR_LOGGER.error(params),
};

module.exports = LOGGER;
