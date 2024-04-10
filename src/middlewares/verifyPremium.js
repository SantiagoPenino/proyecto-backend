import jwt from "jsonwebtoken";
import UserDao from "../persistence/daos/userDao.js";
import config from "../config/config.js";
import { HttpResponse } from "../utils/httpResponse.js";

const userDao = new UserDao();
const SECRET_KEY = config.SECRET_KEY;
const httpResponse = new HttpResponse();

export const verifyPremium = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, SECRET_KEY);
    const user = await userDao.getById(decode.userId);
    return user.role === "premium"
      ? next()
      : httpResponse.UNAUTHORIZED(res, "User is not premium");
  } catch (error) {
    next(error);
  }
};
