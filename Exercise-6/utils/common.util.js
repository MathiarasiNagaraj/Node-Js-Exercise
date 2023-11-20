const { TASK_VALIDATION } = require("../constants/common-constants");


const  IS_VALID_JSON=(data)=> {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
}

const USER_VALIDATION = (user) => {
  let errorMessages = [];

  if (
    typeof user.userName !== "string" ||
    !/^[A-Za-z]+$/.test(user.userName) ||
    user.userName.trim().length < 2
  ) {
    if (!/^[A-Za-z]+$/.test(user.userName))
      errorMessages.push("Name should only contain alphabets");
    else errorMessages.push("Name length should greater than 2");
  }
  if (
    typeof user.password !== "string" ||
    !/^[A-Za-z]+$/.test(user.password) ||
    user.password.trim().length < 2
  ) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!regex.test(user.password))
      errorMessages.push(
        "Invalid Password,Password should contain atleast one digit ,one special character"
      );
  
  }
  if (errorMessages.length === 0) {
    return {
      status: true,
    };
  } else {
    return {
      status: false,
      message: errorMessages,
    };
  }
};
const TASKS_VALIDATION = (task) => {
  let errors = "";
  const currentDate = new Date().toLocaleDateString();

  if (typeof task.title !== "string" || task.title.length < 1)
    errors = errors + TASK_VALIDATION.title;
  if (typeof task.description !== "string")
    errors = errors+ TASK_VALIDATION.description;
  if (new Date(task.dueDate) < new Date(currentDate))
    errors = errors  + TASK_VALIDATION.dueDate;

  if (
    !Array.isArray(task.comments) ||
    task.comments.length === 0 ||
    !task.comments.every((comment) => typeof comment === "string")
  ) {
    errors = errors  + TASK_VALIDATION.comments;
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
  IS_VALID_JSON
};
