const USER_SUCCESS_RESPONSE = {
    registerUser: (user) => `${user}  Registred SUCCESSFULLY`,
    loginUser:(user)=>`${user}  Registred SUCCESSFULLY`
}

const USER_ERROR_RESPONSE = {
    registerUser: (user) => `ERROR IN REGISTERING USER ${user}`,
    loginUser:(user)=>`ERROR IN LOGGING IN USER ${user}`,
    alreadyExists: (user) => `${user} ALREADY EXISTS`,
    usernotFound: (user) => `${user} NOT FOUND`,
    invalidPassword:`INVALID PASSWORD`,
    invalidInput:`USER NAME AND PASSWORD REQUIRED`
    
}
const TASK_SUCCESS_RESPONSE = {
    addTask:(taskID)=>`${taskID} ADDED SUCCESSFULLY`
}
const TASK_ERROR_RESPONSE = {
    addTask: (taskID) => `ERROR IN ADDING USER ${taskID}`,
    updateTask: () => ``,
    deleteTask: () => ``,
    
}
module.exports = {
    USER_ERROR_RESPONSE,
    USER_SUCCESS_RESPONSE,
    TASK_ERROR_RESPONSE,
    TASK_SUCCESS_RESPONSE
}