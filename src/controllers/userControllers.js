import Controllers from "./classControllers.js";
import UserServices from "../services/userServices.js";
import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const userServices = new UserServices();

export default class UserControllers extends Controllers {
  constructor() {
    super(userServices);
  }

  register = async (req, res, next) => {
    try {
      const data = await userServices.register(req.body);
      return !data
        ? httpResponse.FORBIDDEN(res, "Error creating user")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };

  login = async (req, res, next) => {
    try {
      const data = await userServices.login(req.body);
      if (!data) {
        return httpResponse.UNAUTHORIZED(res, "Error login");
      } else {
        res.cookie("token", data.token, {
          httpOnly: true,
        });
        res.header("Authorization", `Bearer ${data.token}`);
        return httpResponse.OK(res, data);
      }
    } catch (error) {
      next(error.message);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const user = await userServices.getUserById(_id);
      if (!user) return false;
      return httpResponse.OK(res, user);
    } catch (error) {
      next(error.message);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const passwordToReset = await userServices.resetPassword(email);
      if (!passwordToReset) {
        return httpResponse.NOT_FOUND(res, "Error resetting password");
      } else {
        res.cookie("tokenpass", passwordToReset.token, {
          httpOnly: true,
        });
        res.header("Authorization", `Bearer ${passwordToReset.token}`);
        return httpResponse.OK(res, passwordToReset);
      }
    } catch (error) {
      next(error.message);
    }
  };
  updatePassword = async (req, res, next) => {
    try {
      const { newPassword } = req.body;
      const user = req.user;
      const response = await this.services.updatePassword(user, newPassword);
      if (response) {
        res.clearCookie("tokenpass");
        return httpResponse.OK(res, "Password updated");
      }
    } catch (error) {
      next(error.message);
    }
  };

  deleteInactive = async (req, res, next) => {
    try {
      const inactiveUsers = await userServices.deleteInactive();
      return !inactiveUsers
        ? httpResponse.NOT_FOUND(res, "Error deleting inactive users")
        : httpResponse.OK(res, inactiveUsers);
    } catch (error) {
      next(error.message);
    }
  };
}
