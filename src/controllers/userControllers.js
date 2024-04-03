import Controllers from "./classControllers.js";
import UserServices from "../services/userServices.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const userServices = new UserServices();

export default class UserControllers extends Controllers {
  constructor() {
    super(userServices);
  }

  register = async (req, res, next) => {
    try {
      const user = await userServices.register(req.body);
      return !user
        ? httpResponse.FORBIDDEN(res, dictionary.ERROR_CREATE_USER)
        : httpResponse.OK(res, user);
    } catch (error) {
      next(error.message);
    }
  };

  login = async (req, res, next) => {
    try {
      const { token, userId } = await userServices.login(req.body);
      if (!token || !userId) {
        console.log('token', token, 'userId', userId);
        return httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN);
      } else {
        res.cookie("token", token, {
          httpOnly: true,
        });
        return httpResponse.OK(res, { token, userId });
      }
    } catch (error) {
      next(error.message);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { firstName, lastName, email, role } = req.user;
      return httpResponse.OK(res, { firstName, lastName, email, role });
    } catch (error) {
      next(error.message);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const user = req.user;
      const resetToken = await userServices.resetPassword(user);
      return resetToken
        ? (res.cookie("tokenpass", resetToken),
          httpResponse.OK(res, { msg: "Email reset password sent" }))
        : httpResponse.NOT_FOUND(res, "Error sending email");
    } catch (error) {
      next(error.message);
    }
  };
  updatePassword = async (req, res, next) => {
    try {
      const {
        user,
        body: { password },
        cookies: { passwordToken },
      } = req;
      const updatedPassword = await userServices.updatePassword(user, password);
      return !passwordToken
        ? httpResponse.FORBIDDEN(res, dictionary.ERROR_TOKEN)
        : !updatePassword
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_PASSWORD)
        : (res.clearCookie("passwordToken"),
          httpResponse.OK(res, updatedPassword));
    } catch (error) {
      next(error.message);
    }
  };

  deleteInactive = async (req, res, next) => {
    try {
      const inactiveUsers = await userServices.deleteInactive();
      return !inactiveUsers
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_ITEM)
        : httpResponse.OK(res, inactiveUsers);
    } catch (error) {
      next(error.message);
    }
  };
}
