import TaskService from "../service/task.js";

export default class TaskController {
  static createTask = async (req, res, next) => {
    try {
      const newTask = await TaskService.createTask(req.body);
      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: newTask.id
      });
    } catch (err) {
      next(err);
    }
  }

  static getAllTasks = async (req, res, next) => {
    try {
      const tasks = await TaskService.getTask();
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: Array.isArray(tasks) ? tasks.length : null,
          tasks
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getOneTask = async (req, res, next) => {
    try {
      const {id} = req.params;
      const task = await TaskService.getTask(id);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: task !== null ? 1 : 0,
          task
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static updateOneTask = async (req, res, next) => {
    try {
      const {id} = req.params;
      const task = await TaskService.updateTask(id, req.body);
      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task.id
      });
    } catch (err) {
      next(err);
    }
  }

  static deleteOneTask = async (req, res, next) => {
    try {
      const {id} = req.params;
      const task = await TaskService.deleteTask(id);
      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: task.id
      });
    } catch (err) {
      next(err);
    }
  }

  static getTasksByProject = async (req, res, next) => {
    try {
      const {projectId} = req.params;
      const tasks = await TaskService.getTasksByProject(projectId);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: Array.isArray(tasks) ? tasks.length : null,
          tasks
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getTasksByAssignee = async (req, res, next) => {
    try {
      const {assigneeId} = req.params;
      const tasks = await TaskService.getTasksByAssignee(assigneeId);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: Array.isArray(tasks) ? tasks.length : null,
          tasks
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getTasksByStatus = async (req, res, next) => {
    try {
      const {status} = req.params;
      const tasks = await TaskService.getTasksByStatus(status);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: Array.isArray(tasks) ? tasks.length : null,
          tasks
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getTasksDueSoon = async (req, res, next) => {
    try {
      const {days = 7} = req.query;
      const tasks = await TaskService.getTasksDueSoon(parseInt(days));
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: Array.isArray(tasks) ? tasks.length : null,
          tasks
        }
      });
    } catch (err) {
      next(err);
    }
  }
}
