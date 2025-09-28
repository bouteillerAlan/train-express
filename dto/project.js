import {body} from "express-validator";
import {isValidMongoId} from "../utils/string.js";

export const validateCreateProject = [
  body("name")
    .notEmpty()
    .withMessage("Project name is required")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Project name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("owner")
    .notEmpty()
    .withMessage("Owner is required")
    .isMongoId()
    .withMessage("Owner must be a valid user ID"),

  body("members")
    .optional()
    .isArray()
    .withMessage("Members must be an array")
    .custom((members) => {
      if (members && members.length > 0) {
        return members.every(member => isValidMongoId(member));
      }
      return true;
    })
    .withMessage("All members must be valid user IDs"),
];

export const validateUpdateProject = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Project name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("owner")
    .optional()
    .isMongoId()
    .withMessage("Owner must be a valid user ID"),

  body("members")
    .optional()
    .isArray()
    .withMessage("Members must be an array")
    .custom((members) => {
      if (members && members.length > 0) {
        return members.every(member => isValidMongoId(member));
      }
      return true;
    })
    .withMessage("All members must be valid user IDs"),
];
