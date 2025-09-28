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
}
