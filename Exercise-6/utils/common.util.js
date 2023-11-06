const { TASK_VALIDATION } = require("../constants/common-constants");

const USER_VALIDATION = (user) => {

    
};
const TASKS_VALIDATION = (task) => {
    let errors = "";

    const currentDate = new Date().toLocaleDateString();
  if (typeof task.title !== "string" || task.title.length < 1)
    errors = errors + "\r\n" + TASK_VALIDATION.title;
  if (typeof task.description !== "string" )
    errors = errors + "\r\n" + TASK_VALIDATION.description;
  if (new Date(task.dueDate) < new Date(currentDate))
    errors = errors + "\r\n" + TASK_VALIDATION.dueDate;

  if (
    !Array.isArray(task.comments) ||
    task.comments.length === 0 ||
    !task.comments.every((comment) => typeof comment === "string")
  ) {
    errors = errors + "\n" + TASK_VALIDATION.comments;
  }

  if (errors === "") {
    return {
      status: true,
      message: "",
    };
  } else {
    return {
      status: false,
      message: errors,
    };
  }
};

const FILTER_TASKS = (filters, tasks) => {
  const filtersTasks = tasks.filter((task) => {
    // Check if the filter criteria match the task
    const titleMatch = !filters.title || task.title === filters.title;
    const priorityMatch =
      !filters.priority || task.priority === filters.priority;
    const dueDateMatch = !filters.dueDate || task.dueDate === filters.dueDate;

    // Return true only if all filter criteria match
    return titleMatch && priorityMatch && dueDateMatch;
  });

  return filtersTasks;
};

module.exports = {
  USER_VALIDATION,
  FILTER_TASKS,
  TASKS_VALIDATION,
};
