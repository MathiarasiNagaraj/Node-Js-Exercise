const LOGGER = require("../logger/index");
const taskServices = require("../services/tasksService");

/**
 * @author Mathiarasi
 * @description  add task controller for adding task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and message of adding task
 */

const addTaskController = async (req, res) => {
  LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
  const response = await taskServices.addTaskService();
  if (response.status) {
  } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};
/**
 * @author Mathiarasi
 * @description  read task controller for reading task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and all task data
 */

const readTasksController = async (req, res) => {
  LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
  const response = await taskServices.readTasksService();
  if (response.status) {
  } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};

/**
 * @author Mathiarasi
 * @description  read task controller for reading task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and task data for given ID
 */

const readTaskByIdController = async (req, res) => {
  LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
  const response = await taskServices.readTaskByIdService();
  if (response.status) {
  } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};
/**
 * @author Mathiarasi
 * @description  update task controller for updating task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and  message of updating task data
 */

const updateTaskByIdController = async (req, res) => {
  LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
  const response = await taskServices.updateTaskByIdService();
  if (response.status) {
  } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};

/**
 * @author Mathiarasi
 * @description  delete task controller for deleting task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and  message of deleting task data
 */

const deleteTaskByIdController = async (req, res) => {
  LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
  const response = await taskServices.deleteTaskByIdService();
  if (response.status) {
  } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};

/**
 * @author Mathiarasi
 * @description  delete task controller for deleting task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and  message of deleting task data
 */

const deleteTasksController = async (req, res) => {
    LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
    const response = await taskServices.deleteTasksService()
    if (response.status) {
    } else {
      LOGGER.error(
        `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
      );
      res.status(response.statusCode).send({ message: response.data });
    }
  };
  
/**
 * @author Mathiarasi
 * @description  filter task controller for filtering  task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and  filtered task data
 */

const filterTaskController = async (req, res) => {
  LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
  const response = await taskServices.filterTaskService();
  if (response.status) {
  } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};
/**
 * @author Mathiarasi
 * @description  sort task controller for sorting task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and  sorted task data
 */

const sortTaskController = async (req, res) => {
  LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
  const response = await taskServices.sortTaskService();
  if (response.status) {
  } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};

/**
 * @author Mathiarasi
 * @description  pagination task controller for updating task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and  message of updating task data
 */

const paginationTaskController = async (req, res) => {
  LOGGER.info(`INFO IP: ${req.ip} URL: ${req.url}`);
  const response = await taskServices.paginationTaskService();
  if (response.status) {
  } else {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
    res.status(response.statusCode).send({ message: response.data });
  }
};

module.exports = {
  addTaskController,
  readTasksController,
  readTaskByIdController,
  updateTaskByIdController,
    deleteTaskByIdController,
    deleteTasksController,
  filterTaskController,
  sortTaskController,
    paginationTaskController,
  
};
