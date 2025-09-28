import express from "express";
import {validateCreateUser, validateUpdateUser} from "../dto/user.js";
import {handleValidationErrors} from "../middleware/validation.js";
import UserController from "../controller/user.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getOneUser);

router.post("/", validateCreateUser, handleValidationErrors, UserController.createUser);

router.put("/:id", validateUpdateUser, handleValidationErrors, UserController.updateOneUser);

router.delete("/:id", UserController.deleteOneUser);

export default router;
