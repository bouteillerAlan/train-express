import mongoose from "mongoose";
import stringCleanPlugin from "../plugin/string.js";

const { Schema } = mongoose;

const projectSchema = new Schema({
    "name": {type: String, required: true},
    "description": {type: String, required: false},
    "owner": {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    "members": [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}]
  },
  { timestamps: true }
);

projectSchema.plugin(stringCleanPlugin, { fields: ["name"] });
projectSchema.plugin(stringCleanPlugin, { fields: ["description"], lowercase: false });

const Project = mongoose.model("Project", projectSchema);
export default Project;
