import mongoose from "mongoose";
import stringCleanPlugin from "../plugin/string.js";
import bcrypt from "bcrypt";
import {Roles} from "../enums/user.js";
import {getHash} from "../utils/hash.js";

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
  this.password = await getHash(this.password);
  next();
});

userSchema.pre("findOneAndUpdate", async function(next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await getHash(update.password);
  }
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
