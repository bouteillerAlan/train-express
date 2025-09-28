import {body} from "express-validator";
import {Roles} from "../enums/user.js";

export const validateUser = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(Object.values(Object.values(Roles)))
    .withMessage(`Role must be one of: ${Object.values(Object.values(Roles)).join(', ')}`),

  body('firstname')
    .optional()
    .trim(),

  body('lastname')
    .optional()
    .trim(),
];
