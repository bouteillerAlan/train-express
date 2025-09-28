import express from "express";
import {validateCreateProject, validateUpdateProject} from "../dto/project.js";
import {handleValidationErrors} from "../middleware/validation.js";
import ProjectController from "../controller/project.js";

const router = express.Router();

router.get("/", ProjectController.getAllProjects);

router.get("/:id", ProjectController.getOneProject);

router.post("/", validateCreateProject, handleValidationErrors, ProjectController.createProject);

router.put("/:id", validateUpdateProject, handleValidationErrors, ProjectController.updateOneProject);

router.delete("/:id", ProjectController.deleteOneProject);

router.get("/owner/:ownerId", ProjectController.getProjectsByOwner);

router.get("/member/:memberId", ProjectController.getProjectsByMember);

export default router;
