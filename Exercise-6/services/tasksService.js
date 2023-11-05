const { TASK_FILE_PATH } = require("../constants/common-constants");
const {
  TASK_ERROR_RESPONSE,
  TASK_SUCCESS_RESPONSE,
} = require("../constants/response-constants");
const { FILTER_TASKS } = require("../utils/common.util");
const { writeFileData, readFileData } = require("../utils/file.utils");

/**
 * @author Mathiarasi
 * @description  add task Service for adding task
 * @returns response with status code and message of adding task
 */

const addTaskService = async (userName, task) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    const currentTaskId = Tasks[userIndex]?.tasks?.length + 1 || 1;
    if (userIndex == -1) {
      const newUser = {
        userName: userName,
        tasks: [
          {
            ...task,
            id: currentTaskId,
          },
        ],
      };
      Tasks.push(newUser);
      await writeFileData(TASK_FILE_PATH, JSON.stringify(Tasks));
    } else {
      Tasks[userIndex].tasks.push({ ...task, id: currentTaskId });
      await writeFileData(TASK_FILE_PATH, JSON.stringify(Tasks));
    }
    return {
      status: true,
      statusCode: 201,
      data: TASK_SUCCESS_RESPONSE.addTask(currentTaskId),
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.addTask + err.message,
    };
  }
};
/**
 * @author Mathiarasi
 * @description  read task Service for reading task
 * @returns response with status code and all task data
 */

const readTasksService = async (userName) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    if (userIndex === -1) {
      return {
        status: true,
        statusCode: 204,
        data: "USER NOT FOUND",
      };
    }
    const currentTasks = Tasks[userIndex].tasks;

    if (currentTasks.length === 0) {
      return {
        status: true,
        statusCode: 204,
        data: TASK_SUCCESS_RESPONSE.notaskFound,
      };
    } else {
      return {
        status: true,
        statusCode: 200,
        data: Tasks[userIndex].tasks,
      };
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.readTask + err.message,
    };
  }
};

/**
 * @author Mathiarasi
 * @description  read task Service for reading task
 * @returns response with status code and task data for given ID
 */

const readTaskByIdService = async (userName, id) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    const currentTasks = Tasks[userIndex].tasks;
    if (userIndex === -1 || currentTasks.length === 0) {
      return {
        status: true,
        statusCode: 204,
        data: TASK_SUCCESS_RESPONSE.notaskFound,
      };
    } else {
      const task = Tasks[userIndex].tasks.find((task) => task.id === id);
      if (task) {
        return {
          status: true,
          statusCode: 200,
          data: task,
        };
      } else {
        return {
          status: false,
          statusCode: 404,
          data: TASK_ERROR_RESPONSE.invalidTaskID,
        };
      }
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.readTask + err.message,
    };
  }
};
/**
 * @author Mathiarasi
 * @description  update task Service for updating task
 * @returns response with status code and  message of updating task data
 */

const updateTaskByIdService = async (userName, id, updatedTask) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    const currentTasks = Tasks[userIndex].tasks;
    if (userIndex === -1 || currentTasks.length === 0) {
      return {
        status: true,
        statusCode: 204,
        data: TASK_SUCCESS_RESPONSE.notaskFound,
      };
    } else {
      const task = Tasks[userIndex].tasks.find((task) => task.id === id);
      if (task) {
        Object.keys(task).forEach(
          (key) =>
            (task[key] = updatedTask.hasOwnProperty(key)
              ? updatedTask[key]
              : task[key])
        );
        await writeFileData(TASK_FILE_PATH, JSON.stringify(Tasks));
        return {
          status: true,
          statusCode: 200,
          data: TASK_SUCCESS_RESPONSE.updateTask(task.id),
        };
      } else {
        return {
          status: false,
          statusCode: 404,
          data: TASK_ERROR_RESPONSE.invalidTaskID,
        };
      }
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.readTask + err.message,
    };
  }
};

/**
 * @author Mathiarasi
 * @description  delete task Service for deleting task
 * @returns response with status code and  message of deleting task data
 */

const deleteTaskByIdService = async (userName, id) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    const currentTasks = Tasks[userIndex].tasks;
    if (userIndex === -1 || currentTasks.length === 0) {
      return {
        status: true,
        statusCode: 204,
        data: TASK_SUCCESS_RESPONSE.notaskFound,
      };
    } else {
      const task = Tasks[userIndex].tasks.find((task) => task.id === id);
      if (task) {
        const filteredTasks = Tasks[userIndex].tasks.filter(
          (task) => task.id !== id
        );
        Tasks[userIndex].tasks = filteredTasks;
        await writeFileData(TASK_FILE_PATH, JSON.stringify(Tasks));
        return {
          status: true,
          statusCode: 200,
          data: TASK_SUCCESS_RESPONSE.deleteTask(task.id),
        };
      } else {
        return {
          status: false,
          statusCode: 404,
          data: TASK_ERROR_RESPONSE.invalidTaskID,
        };
      }
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.readTask + err.message,
    };
  }
};
/**
 * @author Mathiarasi
 * @description  delete task Service for deleting task
 * @returns response with status code and  message of deleting task data
 */

const deleteTasksService = async (userName) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    const currentTasks = Tasks[userIndex].tasks;
    if (userIndex === -1 || currentTasks.length === 0) {
      return {
        status: true,
        statusCode: 204,
        data: TASK_SUCCESS_RESPONSE.notaskFound,
      };
    } else {
      Tasks[userIndex].tasks = [];
      await writeFileData(TASK_FILE_PATH, JSON.stringify(Tasks));
      return {
        status: true,
        statusCode: 200,
        data: TASK_SUCCESS_RESPONSE.deleteAllTasks(userName),
      };
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.readTask + err.message,
    };
  }
};
/**
 * @author Mathiarasi
 * @description  filter task Service for filtering  task
 * @returns response with status code and  filtered task data
 */

const filterTaskService = async (userName,filter) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    const currentTasks = Tasks[userIndex].tasks;
    if (userIndex === -1 || currentTasks.length === 0) {
      return {
        status: true,
        statusCode: 204,
        data: TASK_SUCCESS_RESPONSE.notaskFound,
      };

    } else {
   
const filteredTasks=FILTER_TASKS(filter,currentTasks)
      return {
        status: true,
        statusCode: 200,
        data: filteredTasks,
      };
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.readTask + err.message,
    };
  }
};
/**
 * @author Mathiarasi
 * @description  sort task Service for sorting task
 * @returns response with status code and  sorted task data
 */

const sortTaskService = async (userName, sortCriteria) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    const currentTasks = Tasks[userIndex].tasks;
    if (userIndex === -1 || currentTasks.length === 0) {
      return {
        status: true,
        statusCode: 204,
        data: TASK_SUCCESS_RESPONSE.notaskFound,
      };
    } else {
      let sortedData = [];
    
      switch (sortCriteria) {
        case "title":
          sortedData = currentTasks.sort((task1, task2) => {
            const TITLE_1 = task1.title.toUpperCase();
            const TITLE_2 = task2.title.toUpperCase();
            return TITLE_1 > TITLE_2 ? 1 : TITLE_2 > TITLE_1 ? -1 : 0;
          });
          break;
        case "priority":
          const PRIORITIES = ["high", "medium", "low"];
          sortedData = currentTasks.sort((task1, task2) => {
            const PRIORITY_1 = PRIORITIES.indexOf(task1.priority.toLowerCase());
            const PRIORITY_2 = PRIORITIES.indexOf(task2.priority.toLowerCase());
            return PRIORITY_1 > PRIORITY_2
              ? 1
              : PRIORITY_2 > PRIORITY_1
              ? -1
              : 0;
          });
          break;
        case "dueDate":
          sortedData = currentTasks.sort((task1, task2) => {
            const DATE_1 = new Date(task1.dueDate);
            const DATE_2 = new Date(task2.dueDate);
            return DATE_1 > DATE_2 ? 1 : DATE_2 > DATE_1 ? -1 : 0;
          });
          break;
        default:
          throw new Error("Invalid sort request!!!");
      }
      return {
        status: true,
        statusCode: 200,
        data: sortedData,
      };
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.readTask + err.message,
    };
  }
};

/**
 * @author Mathiarasi
 * @description  pagination task Service for updating task
 * @returns response with status code and  message of updating task data
 */

const paginationTaskService = async (userName,page,pageSize) => {
  try {
    const Tasks = await readFileData(TASK_FILE_PATH);
    const userIndex = Tasks.findIndex((task) => task.userName === userName);
    const currentTasks = Tasks[userIndex].tasks;
    if (userIndex === -1 || currentTasks.length === 0) {
      return {
        status: true,
        statusCode: 204,
        data: TASK_SUCCESS_RESPONSE.notaskFound,
      };
    } else {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      if (startIndex > currentTasks.length || page === 0 || pageSize === 0)
      {
        return {
          status: false,
          statusCode: 404,
          data: 'Invalid pagination',
        };
        }
      const filteredTasks = currentTasks.slice(startIndex, endIndex);
      return {
        status: true,
        statusCode: 200,
        data: filteredTasks,
      };

    }
  } catch (err) {
    return {
      status: false,
      statusCode: 500,
      data: TASK_ERROR_RESPONSE.readTask + err.message,
    };
  }
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
