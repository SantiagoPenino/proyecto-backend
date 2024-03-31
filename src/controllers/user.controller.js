import Controllers from "./class.controllers.js";
import UserService from "../services/userService.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const service = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(service);
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
        ? httpResponse.UNAUTHORIZED(res, dictionary.ERROR_LOGIN)
        : httpResponse.OK(res, userExists);
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { firstName, lastName, email, role } = req.user;
      return httpResponse.OK(res, { firstName, lastName, email, role });
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
      const updatedPassword = await service.updatePassword(user, password);
      return !passwordToken
        ? httpResponse.FORBIDDEN(res, dictionary.ERROR_TOKEN)
        : !updatePassword
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_PASSWORD)
        : (res.clearCookie("passwordToken"),
          httpResponse.OK(res, updatedPassword));
    } catch (error) {
      next(error);
    }
  };

  removeInactive = async (req, res, next) => {
    try {
      const deletedUser = await service.removeInactive();
      return !deletedUser
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_ITEM)
        : httpResponse.OK(res, deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
