const path = require("path"); 
const USER_FILE_PATH = path.join('models', '/users.json');
const TASK_FILE_PATH = path.join('models', '/tasks.json');

const TASK_VALIDATION = {
    title: 'TITLE SHOULD CONTAIN ATLEAST 1 LETTER',
    description: 'DESCRIPTION SHOULD HAVE ATLEAST 1 WORD',
    dueDate: 'DUEDATE  SHOULD  BE A FUTURE DATE',
    comments:'ADD ATLEAST ONE COMMENT'
}
module.exports = {
    USER_FILE_PATH,
    TASK_FILE_PATH,
    TASK_VALIDATION
}

