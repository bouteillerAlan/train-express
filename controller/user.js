import UserService from "../service/user.js";

export default class UserController {
  static createUser = async (req, res, next) => {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser.id
      });
    } catch (err) {
      next(err);
    }
  }

  static getAllUsers = async (req, res, next) => {
    try {
      const users = await UserService.getUser();
      res.status(200).json({
        success: true,
        message: '',
        data: {
          total: Array.isArray(users) ? users.length : null,
          users
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getOneUser = async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await UserService.getUser(id);
      res.status(200).json({
        success: true,
        message: '',
        data: {
          total: user !== null ? 1 : 0,
          user
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static updateOneUser = async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await UserService.updateUser(id, req.body);
      res.status(201).json({
        success: true,
        message: 'User updated successfully',
        data: user.id
      });
    } catch (err) {
      next(err);
    }
  }

  static deleteOneUser = async (req, res, next) => {
    try {
      const {id} = req.params;
      const user = await UserService.getUser(id);
      res.status(200).json({
        success: true,
        message: '',
        data: {
          total: user !== null ? 1 : 0,
          user
        }
      });
    } catch (err) {
      next(err);
    }
  }
}
