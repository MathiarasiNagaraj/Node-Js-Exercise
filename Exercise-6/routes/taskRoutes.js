const express = require("express");
const { TASK_ROUTE } = require("../constants/route-constants");
const router = express.Router();
const taskController = require("../controller/tasksController");

router.route(TASK_ROUTE.general)
    .get(taskController.readTasksController)
    .post(taskController.addTaskController)
    .delete(taskController.deleteTasksController);

router.route(TASK_ROUTE.specific)
    .get(taskController.readTaskByIdController)
    .patch(taskController.updateTaskByIdController)
    .delete(taskController.deleteTaskByIdController);

router.route(TASK_ROUTE.filter)
    .get(taskController.filterTaskController)
router.route(TASK_ROUTE.sort)
    .get(taskController.sortTaskController)
router.route(TASK_ROUTE.pagination)
    .get(taskController.paginationTaskController)
module.exports = router;
