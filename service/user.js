import User from "../schema/user.js";

export default class UserService {
  static createUser = async (user) => {
    try {
      // the hash is done in the schema via pre save hook
      // this is just a choice it can be done in the service has well
      return User.create(user);
    } catch (err) {
      throw new Error("User creation error");
    }
  }

  static getUser = async (id) => {
    if (id && typeof id === "string") {
      return User.findById(id).populate('owner').populate('members').sort({ createdAt: -1 });
    }
    return User.find().populate('owner').populate('members').sort({ createdAt: -1 });
  }

  static updateUser = async (id, user) => {
    if (id && typeof id === "string") {
      return User.findByIdAndUpdate(id, user);
    } else {
      throw new Error("Invalid id");
    }
  }

  static removeUser = async (id) => {
    if (id && typeof id === "string") {
      return User.findByIdAndDelete(id);
    } else {
      throw new Error("Invalid id");
    }
  }
}
