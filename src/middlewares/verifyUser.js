import Jwt from "jsonwebtoken";
import UserDao from "../persistence/daos/userDao.js";
import config from "../config/config.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const userDao = new UserDao();
const SECRET_KEY = config.SECRET_KEY;
const httpResponse = new HttpResponse();

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = Jwt.verify(token, SECRET_KEY);
    console.log("decoded token", decoded);
    const user = await userDao.getById(decoded.userId);
    if (user && (user.role === "admin" || user.role === "premium")) {
      req.user = user;
      next();
    } else {
      return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN);
    }
  } catch (error) {
    console.log(error);
    return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN);
  }
};
