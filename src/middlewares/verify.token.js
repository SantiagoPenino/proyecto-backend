import jwt from "jsonwebtoken";
import UserMongoDao from "../persistence/dao/mongodb/user/user.dao.js";
import config from "../config/config.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;
const AUTH_HEADER = "Authorization";
const httpResponse = new HttpResponse();

export const verifyToken = async (req, res, next) => {
  const authHeader = req.get(AUTH_HEADER);
  if (!authHeader)
    return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN);
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await userDao.getById(decoded.userId);
    return !user || user.role !== "admin"
      ? (console.log(user.role),
        httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN))
      : ((req.user = user), next());
  } catch (error) {
    next(error);
  }
};
