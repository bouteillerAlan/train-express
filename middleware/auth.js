import AuthService from "../service/auth.js";
import UserService from "../service/user.js";

function sendError(res) {
  return res.status(401).json({success: false, message: "unauthorized"});
}

// by default the role is set to admin to avoid any security issue
export const handleAuth = async (req, res, next, role = ["admin"]) => {
  const jwtNotCheck = req.headers.authorization;
  if (!jwtNotCheck || !jwtNotCheck.startsWith("Bearer")) {
    return sendError(res);
  }

  const jwt = jwtNotCheck.split(" ")[1];
  if (!jwt) return sendError(res);

  const jwtIsOk = await AuthService.verifyJwt(jwt);
  if (!jwtIsOk) return sendError(res);

  const user = await UserService.getUser(jwtIsOk.uid);
  if (!user) return sendError(res);

  if (Array.isArray(role) && role.length > 0) {
    if (!user.role) return sendError(res);
    if (!role.includes(user.role)) return sendError(res);
  }

  req.user = user;
  next();
}
