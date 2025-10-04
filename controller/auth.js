import UserService from "../service/user.js";
import AuthService from "../service/auth.js";

export default class AuthController {
  static getJwt = async (req, res, next) => {
    try {
      const {email, password} = req.body;

      const user = await UserService.getUserByFieldWithPassword("email", email);
      // userNotFound is handled by the service

      const isValid = await user.checkPassword(password);
      if (!isValid) return res.status(401).json({success: false, message: "invalid credentials"});

      const payload = {
        email: user.email,
        role: user.role
      };
      const jwt = await AuthService.buildJwt(payload);
      if (!jwt) return res.status(500).json({success: false, message: "jwt build error"});

      return res.status(200).json({
        success: true,
        message: "login successful",
        data: jwt
      });

    } catch (err) {
      next(err);
    }
  }

  static validateJwt = async (req, res, next) => {
    try {
      const {authorization} = req.headers;
      if (!authorization) return res.status(401).json({success: false, message: "no authorization header"});
    } catch (err) {
      next(err);
    }
  }
}
