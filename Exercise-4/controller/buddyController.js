const LOGGER = require('../logger');
const buddyServices=require('../services/buddyServices')
const getAllBuddies = (req, res) => {

    buddyServices.getAllBuddies(req, res)
}
const getBuddyWithId = (req, res) => {

    buddyServices.getBuddyWithId(req, res);
    
}
const createNewBuddy = (req, res) => {

    buddyServices.createNewBuddy(req,res);
}
const updateBuddy = (req, res) => {
    buddyServices.updateBuddy(req, res);
    
}
const deleteBuddy = (req, res) => {
    buddyServices.deleteBuddy(req, res);
    
}

module.exports = {
    getAllBuddies,
    createNewBuddy,
    updateBuddy,
    getBuddyWithId,
    deleteBuddy
}