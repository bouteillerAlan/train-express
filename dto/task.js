import {body} from "express-validator";
import {isValidMongoId} from "../utils/string.js";
import {Status} from "../enums/task.js";

export const validateCreateTask = [
  body("title")
    .notEmpty()
    .withMessage("Task title is required")
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Task title must be between 2 and 200 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("status")
    .optional()
    .isIn(Object.values(Status))
    .withMessage(`Status must be one of: ${Object.values(Status).join(", ")}`),

  body("project")
    .notEmpty()
    .withMessage("Project is required")
    .isMongoId()
    .withMessage("Project must be a valid project ID"),

  body("assignee")
    .notEmpty()
    .withMessage("Assignee is required")
    .isMongoId()
    .withMessage("Assignee must be a valid user ID"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date")
    .custom((dueDate) => {
      if (dueDate && new Date(dueDate) <= new Date()) {
        throw new Error("Due date must be in the future");
      }
      return true;
    }),
];

export const validateUpdateTask = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Task title must be between 2 and 200 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("status")
    .optional()
    .isIn(Object.values(Status))
    .withMessage(`Status must be one of: ${Object.values(Status).join(", ")}`),

  body("project")
    .optional()
    .isMongoId()
    .withMessage("Project must be a valid project ID"),

  body("assignee")
    .optional()
    .isMongoId()
    .withMessage("Assignee must be a valid user ID"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),
];