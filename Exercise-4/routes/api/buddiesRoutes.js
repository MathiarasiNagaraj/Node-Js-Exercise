const express = require("express");
const router = express.Router();
const buddyController = require("../../controller/buddyController");

router
  .route("/")
  .get(buddyController.getAllBuddies)
  .post(buddyController.createNewBuddy)
  .put(buddyController.updateBuddy)
  .delete(buddyController.deleteBuddy);

router.route("/:id").get(buddyController.getBuddyWithId);

module.exports = router;
