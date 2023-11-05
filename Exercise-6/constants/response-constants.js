const USER_SUCCESS_RESPONSE = {
    registerUser: (user) => `${user}  Registred SUCCESSFULLY`,
    loginUser:(user)=>`${user} LOGGED IN  SUCCESSFULLY`
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
    addTask: (taskID) => `${taskID} ADDED SUCCESSFULLY`,
    notaskFound: (user) => `NO TASK FOUND FOR ${user}`,
    updateTask: (taskId) => `${taskId} UPDATED SUCCESSFULLY`,
    deleteTask: (taskId) => `${taskId} DELETED SUCCESSFULLY`,
    deleteAllTasks:(user)=>`DELETED ALL TASKS OF ${user} SUCCESSFULLY`
   

}
const TASK_ERROR_RESPONSE = {
    addTask:`ERROR IN ADDING USER`,
    readTask: `ERROR IN READING USER`,
    updateTask: `ERROR IN UPDATING USER`,
    deleteTask: `ERROR IN DELETING USER`,
    filterTask: `ERROR IN FILTERING USER`,
    invalidTaskID:`INVALID TASK ID`
   
    
}
module.exports = {
    USER_ERROR_RESPONSE,
    USER_SUCCESS_RESPONSE,
    TASK_ERROR_RESPONSE,
    TASK_SUCCESS_RESPONSE
}