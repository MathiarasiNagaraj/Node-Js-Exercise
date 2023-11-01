const express = require("express");
const router = express.Router();
const buddyController = require("../../controller/buddyController");

/**
 * routes for handling common requests
 */
router
  .route("/")
  .get(buddyController.getAllBuddies)
  .post(buddyController.createNewBuddy)
  .delete(buddyController.deleteAllBuddy);

/**
 * routes for handling request with particular ID
 */
router
  .route("/:id")
  .get(buddyController.getBuddyWithId)
  .delete(buddyController.deleteBuddy)
  .patch(buddyController.updateBuddy)


module.exports = router;
