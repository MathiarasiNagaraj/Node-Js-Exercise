const LOGGER = require("../logger/index");
const taskServices = require("../services/tasksService");
const { verifyJWTToken } = require("../utils/auth.utils");

/**
 * @author Mathiarasi
 * @description  add task controller for adding task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and message of adding task
 */

const addTaskController = async (req, res) => {
  LOGGER.info(`INFO  ADD IP: ${req.ip} URL: ${req.url} `);
  const userName = verifyJWTToken(req, res);
  const task = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    comments: req.body.comments,
    createdDate: new Date().toISOString(),
  };
  const response = await taskServices.addTaskService(userName, task);
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
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
  const userName = verifyJWTToken(req, res);
  const response = await taskServices.readTasksService(userName);
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
};

/**
 * @author Mathiarasi
 * @description  read task controller for reading task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and task data for given ID
 */

const readTaskByIdController = async (req, res) => {
  LOGGER.info(`INFO ready by id  IP: ${req.ip} URL: ${req.url}`);
  const userName = verifyJWTToken(req, res);
  const response = await taskServices.readTaskByIdService(
    userName,
    parseInt(req.params.id)
  );
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
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
  const userName = verifyJWTToken(req, res);
  const response = await taskServices.updateTaskByIdService(
    userName,
    parseInt(req.params.id),
    req.body
  );
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
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
  const userName = verifyJWTToken(req, res);
  const response = await taskServices.deleteTaskByIdService(
    userName,
    parseInt(req.params.id)
  );
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
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
  const userName = verifyJWTToken(req, res);
  const response = await taskServices.deleteTasksService(userName);
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
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
  const userName = verifyJWTToken(req, res);

 
  const response = await taskServices.filterTaskService(
    userName,
req.query
  );
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
};
/**
 * @author Mathiarasi
 * @description  sort task controller for sorting task
 * @param {http.IncomingMessage} req The HTTP request object.
 * @param {http.ServerResponse} res The HTTP response object.
 * @returns response with status code and  sorted task data
 */

const sortTaskController = async (req, res) => {
  LOGGER.info(`INFO SORT IP: ${req.ip} URL: ${req.url}`);
  const userName = verifyJWTToken(req, res);
  const { sortBy } = req.query;
  const response = await taskServices.sortTaskService(userName, sortBy);
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
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
  
  const userName = verifyJWTToken(req, res);
  const {page,pageSize}=req.query
  const response = await taskServices.paginationTaskService(userName,page,pageSize);
  if (!response.status) {
    LOGGER.error(
      `ERROR  IP: ${req.ip} URL: ${req.url} STATUS: ${response.statusCode} MESSAGE:${response.data}`
    );
  }
  res.status(response.statusCode).json({ message: response.data });
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
