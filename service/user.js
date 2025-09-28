import User from "../schema/user.js";
import {isValidMongoId} from "../utils/string.js";
import {NotFoundError} from "../utils/errors.js";

// todo: the hash is done in the schema via pre save hook
// this is just a personal choice, it can be done in the service has well

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
      return User.findById(id);
    }
    return User.find().sort({ createdAt: -1 });
  }

  static updateUser = async (id, user) => {
    if (isValidMongoId(id)) {
      const updatedUser = await User.findOneAndUpdate({_id: id}, user, {new: true});
      if (!updatedUser) throw new NotFoundError("User not found");
      return updatedUser;
    } else {
      throw new Error("Invalid id");
    }
  }

  static deleteUser = async (id) => {
    if (isValidMongoId(id)) {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new NotFoundError("User not found");
      return deletedUser;
    } else {
      throw new Error("Invalid id");
    }
  }
}
