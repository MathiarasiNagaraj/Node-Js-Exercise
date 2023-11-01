const { format, transport, createLogger, transports } = require("winston");
const { combine, timestamp, colorize, printf, errors, json } = format;
require("dotenv").config();
const logformat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${message || stack}`;
});
/**
 * Creates a winston logger
 *
 * @param {String} loggerLevel - level of log to be allowed in file
 * @param {*} loggerPath - path of file for the logs
 * @returns - a winston logger
 */
const CUSTOM_LOGGER = (loggerlevel, logpath) =>
createLogger({
    transports: new transports.File({
      level: loggerlevel,
      filename:logpath,
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf((info) => `${info.level}:\t${[info.timestamp]}: ${info.message}`)
      ),
    }),
  });

const INFO_LOGGER = CUSTOM_LOGGER(process.env.INFO_LEVEL, "./logs/info.log");
const ERROR_LOGGER = CUSTOM_LOGGER(process.env.ERROR_LEVEL, "./logs/error.log");

const LOGGER = {
    info: (params) => {
    return INFO_LOGGER.info(params);
  },
  error: (params) => {
    return ERROR_LOGGER.error(params);
  },
};

module.exports = LOGGER;
