import Controllers from "./class.controllers.js";
import UserService from "../services/user.service.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const HttpResponse = new HttpResponse();
const UserService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(UserService);
  }

  register = async (req, res, next) => {
    try {
      const user = await UserService.register(req.body);
      return !user
        ? HttpResponse.FORBIDDEN(res, dictionary.ERROR_CREATE_USER)
        : HttpResponse.OK(res, user);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const userExists = await UserService.login(req.body);
      return !userExists
        ? HttpResponse.UNAUTHORIZED(res, dictionary.ERROR_LOGIN)
        : HttpResponse.OK(res, userExists);
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { name, lastName, email, role } = req.user;
      return HttpResponse.OK(res, { name, lastName, email, role });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const user = req.user;
      const resetToken = await UserService.resetPassword(user);
      return resetToken
        ? (res.cookie("tokenpass", resetToken),
          HttpResponse.OK(res, { msg: "Email reset password sent" }))
        : HttpResponse.NOT_FOUND(res, "Error sending email");
    } catch (error) {
      next(error);
    }
  };
  updatePassword = async (req, res, next) => {
    try {
      const {
        user,
        body: { password },
        cookies: { passwordToken },
      } = req;
      const updatePassword = await UserService.updatePassword(user, password);
      return !passwordToken
        ? HttpResponse.FORBIDDEN(res, dictionary.ERROR_TOKEN)
        : !updatePassword
        ? HttpResponse.NOT_FOUND(res, dictionary.ERROR_PASSWORD)
        : (res.clearCookie("passwordToken"),
          HttpResponse.OK(res, updatePassword));
    } catch (error) {
      next(error);
    }
  };
}