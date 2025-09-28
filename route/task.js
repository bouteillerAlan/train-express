import express from "express";
import {validateCreateTask, validateUpdateTask} from "../dto/task.js";
import {handleValidationErrors} from "../middleware/validation.js";
import TaskController from "../controller/task.js";

const router = express.Router();

router.get("/", TaskController.getAllTasks);

router.get("/:id", TaskController.getOneTask);

router.post("/", validateCreateTask, handleValidationErrors, TaskController.createTask);

router.put("/:id", validateUpdateTask, handleValidationErrors, TaskController.updateOneTask);

router.delete("/:id", TaskController.deleteOneTask);

router.get("/project/:projectId", TaskController.getTasksByProject);

router.get("/assignee/:assigneeId", TaskController.getTasksByAssignee);

router.get("/status/:status", TaskController.getTasksByStatus);

router.get("/due-soon", TaskController.getTasksDueSoon);

export default router;
