import mongoose from "mongoose";
import stringCleanPlugin from "../plugin/string.js";
import {Status} from "../enums/task.js";

const { Schema } = mongoose;

const taskSchema = new Schema({
    "title": {type: String, required: true},
    "description": {type: String, required: false},
    "status": {type: String, enum: Object.values(Status), default: "todo"},
    "project": {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
    "assignee": {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    "dueDate": {type: Date, required: false}
  },
  { timestamps: true }
);

taskSchema.plugin(stringCleanPlugin, { fields: ["title"] });
taskSchema.plugin(stringCleanPlugin, { fields: ["description"], lowercase: false });

const Task = mongoose.model("Task", taskSchema);
export default Task;
