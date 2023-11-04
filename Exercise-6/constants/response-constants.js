const USER_SUCCESS_RESPONSE = {
    registerUser: (user) => `${user}  Registred SUCCESSFULLY`,
    loginUser:(user)=>`${user}  Registred SUCCESSFULLY`
}

const USER_ERROR_RESPONSE = {
    addUser: (user) => `ERROR IN ADDING USER ${user}`,
    alreadyExists: (user) => `${user} ALREADY EXISTS`,
    
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