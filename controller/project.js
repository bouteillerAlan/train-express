import ProjectService from "../service/project.js";

export default class ProjectController {
  static createProject = async (req, res, next) => {
    try {
      const newProject = await ProjectService.createProject(req.body);
      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: newProject.id
      });
    } catch (err) {
      next(err);
    }
  }

  static getAllProjects = async (req, res, next) => {
    try {
      const projects = await ProjectService.getProject();
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: Array.isArray(projects) ? projects.length : null,
          projects
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getOneProject = async (req, res, next) => {
    try {
      const {id} = req.params;
      const project = await ProjectService.getProject(id);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: project !== null ? 1 : 0,
          project
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static updateOneProject = async (req, res, next) => {
    try {
      const {id} = req.params;
      const project = await ProjectService.updateProject(id, req.body);
      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: project.id
      });
    } catch (err) {
      next(err);
    }
  }

  static deleteOneProject = async (req, res, next) => {
    try {
      const {id} = req.params;
      const project = await ProjectService.deleteProject(id);
      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
        data: project.id
      });
    } catch (err) {
      next(err);
    }
  }

  static getProjectsByOwner = async (req, res, next) => {
    try {
      const {ownerId} = req.params;
      const projects = await ProjectService.getProjectsByOwner(ownerId);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: Array.isArray(projects) ? projects.length : null,
          projects
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getProjectsByMember = async (req, res, next) => {
    try {
      const {memberId} = req.params;
      const projects = await ProjectService.getProjectsByMember(memberId);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          total: Array.isArray(projects) ? projects.length : null,
          projects
        }
      });
    } catch (err) {
      next(err);
    }
  }
}