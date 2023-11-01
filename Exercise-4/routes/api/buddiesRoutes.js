const express = require("express");
const router = express.Router();
const buddyController = require("../../controller/buddyController");

/**
 * routes with respective controllers
 */
router
  .route("/")
  .get(buddyController.getAllBuddies)
  .post(buddyController.createNewBuddy)
  .delete(buddyController.deleteAllBuddy);

router
  .route("/:id")
  .get(buddyController.getBuddyWithId)
  .delete(buddyController.deleteBuddy)
  .patch(buddyController.updateBuddy)


module.exports = router;
