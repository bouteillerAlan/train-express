import User from "../schema/user.js";
import {isValidMongoId} from "../utils/string.js";
import {NotFoundError} from "../utils/errors.js";

// todo: the hash is done in the schema via pre save hook
// this is just a choice it can be done in the service has well

export default class UserService {
  static createUser = async (user) => {
    try {
      return User.create(user);
    } catch (err) {
      throw new Error("User creation error");
    }
  }

  static getUser = async (id) => {
    if (isValidMongoId(id)) {
      return User.findById(id).sort({ createdAt: -1 });
    }
    return User.find().sort({ createdAt: -1 });
  }

  static updateUser = async (id, user) => {
    if (isValidMongoId(id)) {
      const updatedUser = await User.findOneAndUpdate({_id: id}, user, {new: true});
      if (!updatedUser) {
        throw new NotFoundError("User not found");
      }
      return updatedUser;
    } else {
      throw new Error("Invalid id");
    }
  }

  static removeUser = async (id) => {
    if (isValidMongoId(id)) {
      return User.findByIdAndDelete(id);
    } else {
      throw new Error("Invalid id");
    }
  }
}
