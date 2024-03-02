import jwt from "jsonwebtoken";
import UserMongoDao from "../persistence/dao/mongodb/UserMongoDao.js";
import config from "../config/config.js";

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;
const AUTH_HEADER = "Authorization";
const UNAUTHORIZED_MSG = "User Unauthorized";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.get(AUTH_HEADER);
  if (!authHeader) return res.status(401).json({ error: UNAUTHORIZED_MSG });
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token:", decoded);
    const user = await userDao.getById(decoded.userId);
    if (!user) return res.status(400).json({ error: UNAUTHORIZED_MSG });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: UNAUTHORIZED_MSG });
  }
};
