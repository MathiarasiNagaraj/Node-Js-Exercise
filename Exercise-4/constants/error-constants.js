const FILE_CREATE_ERROR = 'Error creating file';
const FILE_READ_ERROR = 'Error reading file';
const BUDDY_ERROR = {
    add: 'ERROR IN ADDING IN BUDDY',
    getAll: 'ERROR IN GETTING ALL BUDDY',
    get: 'ERROR IN GETTING  BUDDY',
    delete: 'ERROR IN DELETING BUDDY',
    update:'ERROR IN UPDATING BUDDY'
}
const BUDDY_VALIDATION_ERROR = {
    realName: ' Name should contain atleast 3 character',
    nickName: ' Nick Name should contain atleast 3 character',
    dob: 'Invalid Date',
    hobbies:'Hobbies List should contain at least one hobby'
}
module.exports = {
    FILE_CREATE_ERROR,
    FILE_READ_ERROR,
    BUDDY_ERROR,
    BUDDY_VALIDATION_ERROR
}