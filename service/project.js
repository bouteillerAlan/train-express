import Project from "../schema/project.js";
import {isValidMongoId} from "../utils/string.js";
import {NotFoundError} from "../utils/errors.js";

export default class ProjectService {
  static createProject = async (project) => {
    try {
      return Project.create(project);
    } catch (err) {
      throw new Error("Project creation error");
    }
  }

  static getProject = async (id) => {
    if (isValidMongoId(id)) {
      return Project.findById(id)
        .populate("owner", "firstname lastname email")
        .populate("members", "firstname lastname email")
        .sort({ createdAt: -1 });
    }
    return Project.find()
      .populate("owner", "firstname lastname email")
      .populate("members", "firstname lastname email")
      .sort({ createdAt: -1 });
  }

  static updateProject = async (id, project) => {
    if (isValidMongoId(id)) {
      const updatedProject = await Project.findOneAndUpdate({_id: id}, project, {new: true});
      if (!updatedProject) throw new NotFoundError("Project not found");
      return updatedProject;
    } else {
      throw new Error("Invalid id");
    }
  }

  static deleteProject = async (id) => {
    if (isValidMongoId(id)) {
      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) throw new NotFoundError("Project not found");
      return deletedProject;
    } else {
      throw new Error("Invalid id");
    }
  }

  static getProjectsByOwner = async (ownerId) => {
    if (isValidMongoId(ownerId)) {
      return Project.find({ owner: ownerId })
        .populate("owner", "firstname lastname email")
        .populate("members", "firstname lastname email")
        .sort({ createdAt: -1 });
    } else {
      throw new Error("Invalid owner id");
    }
  }

  static getProjectsByMember = async (memberId) => {
    if (isValidMongoId(memberId)) {
      return Project.find({ members: { $in: [memberId] } })
        .populate("owner", "firstname lastname email")
        .populate("members", "firstname lastname email")
        .sort({ createdAt: -1 });
    } else {
      throw new Error("Invalid member id");
    }
  }
}
