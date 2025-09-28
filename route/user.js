import express from "express";
import {validateUser} from "../dto/user.js";
import {handleValidationErrors} from "../middleware/validation.js";
import UserController from "../controller/user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ok");
})

router.post("/", validateUser, handleValidationErrors, UserController.createUser);

router.get("/:id", (req, res) => {})

router.put("/:id", (req, res) => {})

router.delete("/:id", (req, res) => {})

export default router;
