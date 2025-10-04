import express from "express";
import AuthController from "../controller/auth.js";
import {validateLogin} from "../dto/auth.js";
import {handleValidationErrors} from "../middleware/validation.js";

const router = express.Router();

router.post("/login", validateLogin, handleValidationErrors,  AuthController.getJwt);

export default router;
