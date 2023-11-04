const { TASK_FILE_PATH } = require("../constants/common-constants");
const { TASK_ERROR_RESPONSE, TASK_SUCCESS_RESPONSE } = require("../constants/response-constants");
const { writeFileData, readFileData } = require("../utils/file.utils");

/**
 * @author Mathiarasi
 * @description  add task Service for adding task
 * @returns response with status code and message of adding task
 */

const addTaskService = async () => {
    try {
  } catch (err) {}
};
/**
 * @author Mathiarasi
 * @description  read task Service for reading task
 * @returns response with status code and all task data
 */

const readTasksService = async () => {
  try {
  } catch (err) {}
};

/**
 * @author Mathiarasi
 * @description  read task Service for reading task
 * @returns response with status code and task data for given ID
 */

const readTaskByIdService = async () => {
  try {
  } catch (err) {}
};
/**
 * @author Mathiarasi
 * @description  update task Service for updating task
 * @returns response with status code and  message of updating task data
 */

const updateTaskByIdService = async () => {
  try {
  } catch (err) {}
};

/**
 * @author Mathiarasi
 * @description  delete task Service for deleting task
 * @returns response with status code and  message of deleting task data
 */

const deleteTaskByIdService = async () => {
  try {
  } catch (err) {}
};
/**
 * @author Mathiarasi
 * @description  delete task Service for deleting task
 * @returns response with status code and  message of deleting task data
 */

const deleteTasksService = async () => {
    try {
    } catch (err) {}
  };
/**
 * @author Mathiarasi
 * @description  filter task Service for filtering  task
 * @returns response with status code and  filtered task data
 */

const filterTaskService = async () => {
  try {
  } catch (err) {}
};
/**
 * @author Mathiarasi
 * @description  sort task Service for sorting task
 * @returns response with status code and  sorted task data
 */

const sortTaskService = async () => {
  try {
  } catch (err) {}
};

/**
 * @author Mathiarasi
 * @description  pagination task Service for updating task
 * @returns response with status code and  message of updating task data
 */

const paginationTaskService = async () => {
  try {
  } catch (err) {}
};

module.exports = {
  addTaskService,
  readTasksService,
  readTaskByIdService,
  updateTaskByIdService,
    deleteTaskByIdService,
    deleteTasksService,
  filterTaskService,
  sortTaskService,
  paginationTaskService,
};
