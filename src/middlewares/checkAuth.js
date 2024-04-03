import jwt from "jsonwebtoken";
import UserDao from "../persistence/daos/userDao.js";
import config from "../config/config.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const userDao = new UserDao();
const SECRET_KEY = config.SECRET_KEY;
const httpResponse = new HttpResponse();

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN);
    }
    const decode = jwt.verify(token, SECRET_KEY);
    console.log("decoded token", decode);
    const user = await userDao.getById(decode.userId);
    if (!user) {
      return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_FIND_ITEM);
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN);
  }
};
