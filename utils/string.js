import mongoose from "mongoose";

export const isString = (value) => {
  return typeof value === "string" || value instanceof String;
};

export const isValidMongoId = (value) => {
  return isString(value) && value.trim() && mongoose.Types.ObjectId.isValid(value)
}
