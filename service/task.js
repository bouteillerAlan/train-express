import Task from "../schema/task.js";
import {isValidMongoId} from "../utils/string.js";
import {NotFoundError} from "../utils/errors.js";

export default class TaskService {
  static createTask = async (task) => {
    try {
      return Task.create(task);
    } catch (err) {
      throw new Error("Task creation error");
    }
  }

  static getTask = async (id) => {
    if (isValidMongoId(id)) {
      return Task.findById(id)
        .populate("project", "name description")
        .populate("assignee", "firstname lastname email");
    }
    return Task.find()
      .populate("project", "name description")
      .populate("assignee", "firstname lastname email")
      .sort({ createdAt: -1 });
  }

  static updateTask = async (id, task) => {
    if (isValidMongoId(id)) {
      const updatedTask = await Task.findOneAndUpdate(
        {_id: id},
        task,
        {new: true}
      )
      .populate("project", "name description")
      .populate("assignee", "firstname lastname email");

      if (!updatedTask) throw new NotFoundError("Task not found");
      return updatedTask;
    } else {
      throw new Error("Invalid id");
    }
  }

  static deleteTask = async (id) => {
    if (isValidMongoId(id)) {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) throw new NotFoundError("Task not found");
      return deletedTask;
    } else {
      throw new Error("Invalid id");
    }
  }

  static getTasksByProject = async (projectId) => {
    if (isValidMongoId(projectId)) {
      return Task.find({ project: projectId })
        .populate("project", "name description")
        .populate("assignee", "firstname lastname email")
        .sort({ createdAt: -1 });
    } else {
      throw new Error("Invalid project id");
    }
  }

  static getTasksByAssignee = async (assigneeId) => {
    if (isValidMongoId(assigneeId)) {
      return Task.find({ assignee: assigneeId })
        .populate("project", "name description")
        .populate("assignee", "firstname lastname email")
        .sort({ createdAt: -1 });
    } else {
      throw new Error("Invalid assignee id");
    }
  }

  static getTasksByStatus = async (status) => {
    return Task.find({ status })
      .populate("project", "name description")
      .populate("assignee", "firstname lastname email")
      .sort({ createdAt: -1 });
  }

  static getTasksDueSoon = async (days = 7) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return Task.find({
      dueDate: {
        $gte: new Date(),
        $lte: futureDate
      }
    })
    .populate("project", "name description")
    .populate("assignee", "firstname lastname email")
    .sort({ dueDate: 1 });
  }
}
