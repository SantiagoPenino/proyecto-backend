import Jwt from "jsonwebtoken";
import UserMongoDao from "../persistence/dao/mongodb/user/user.dao.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";
import config from "../config/config.js";

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = Jwt.verify(token, SECRET_KEY);
    const user = await userDao.getById(decoded.userId);
    return user && (user.role === "admin" || user.role === "premium")
      ? ((req.user = user), next())
      : httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN);
  } catch (error) {
    next(error);
  }
};
