import jwt from "jsonwebtoken";
import UserDao from "../daos/userDao.js";
import config from "../config/config.js";
import { HttpResponse } from "../utils/httpResponse.js";

const userDao = new UserDao();
const SECRET_KEY = config.SECRET_KEY;
const httpResponse = new HttpResponse();

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return httpResponse.UNAUTHORIZED(res, "Error token");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("decoded token", decoded);
    const user = await userDao.getById(decoded.userId);
    if (!user) {
      return httpResponse.UNAUTHORIZED(res, "Error token");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return httpResponse.UNAUTHORIZED(res, "Error token");
  }
};
