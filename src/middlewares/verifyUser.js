import Jwt from "jsonwebtoken";
import UserDao from "../daos/userDao.js";
import config from "../config/config.js";
import { HttpResponse } from "../utils/httpResponse.js";

const userDao = new UserDao();
const SECRET_KEY = config.SECRET_KEY;
const httpResponse = new HttpResponse();

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = Jwt.verify(token, SECRET_KEY);
    console.log("decode token", decode);
    const user = await userDao.getById(decode.idUser);
    if (user && user.role === "admin" || user.role === "premium") {
      req.user = user;
      next();
    } else {
      return httpResponse.UNAUTHORIZED(res, "Error getting user");
    }
  } catch (error) {
    console.log(error)
  }
};
