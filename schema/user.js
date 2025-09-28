import mongoose from "mongoose";
import stringCleanPlugin from "../plugin/string.js";
import bcrypt from "bcrypt";
import {Roles} from "../enums/user.js";

const { Schema } = mongoose;

const userSchema = new Schema({
    "email": {type: String, required: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"],},
    "password": {type: String, required: true, select: false},
    "firstname": {type: String, required: false},
    "lastname": {type: String, required: false},
    "role": {type: String, enum: Object.values(Roles), default: "dev"},
  },
  { timestamps: true }
);

userSchema.plugin(stringCleanPlugin, { fields: ["email", "firstname", "lastname"] });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.fullname = function fullname() {
  return `${this.firstname} ${this.lastname}`;
}

userSchema.methods.checkPassword = function checkPassword(stringToCheck) {
  return bcrypt.compare(stringToCheck, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;
