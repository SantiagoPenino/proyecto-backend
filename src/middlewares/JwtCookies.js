import jwt from "jsonwebtoken";
import userMongoDao from "../dao/mongodb/user/user.dao.js";
import config from "../config.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const userDao = new userMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const verifyCookie = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN);
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await userDao.getById(decoded.userId);
    if (!user) {
      return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_FIND_ITEM);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
