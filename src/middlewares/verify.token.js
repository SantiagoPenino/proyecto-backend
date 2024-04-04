import jwt from "jsonwebtoken";
import UserDao from "../daos/userDao.js";
import config from "../config/config.js";
import { HttpResponse } from "../utils/httpResponse.js";

const userDao = new UserDao();
const SECRET_KEY = config.SECRET_KEY;
const httpResponse = new HttpResponse();

export const verifyToken = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader)
    return httpResponse.UNAUTHORIZED(res, 'Error token');
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("decoded token", decoded);
    const user = await userDao.getById(decoded.userId);
    if (!user || user.role !== "admin") {
      console.log(user.role);
      return httpResponse.UNAUTHORIZED(res, 'Error token');
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return httpResponse.UNAUTHORIZED(res, 'Error token');
  }
};
