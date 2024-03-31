import Services from "./classService.js";
import persistence from "../persistence/repository/persistence.js";
import { sendMail } from "./mailService.js";

const { userDao } = persistence;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  register = async (user) => {
    try {
      const response = await userDao.register(user);
      await sendMail(user, "register");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    try {
      return await this.dao.login(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  resetPassword = async (user) => {
    try {
      const token = await this.dao.resetPassword(user);
      return token ? await sendMail(user, "resetPassword", token) : false;
    } catch (error) {
      throw new Error(error);
    }
  };

  updatePassword = async (user, password) => {
    try {
      const response = await this.dao.updatePassword(user, password);
      return response || false;
    } catch (error) {
      throw new Error(error);
    }
  };
  lastConnection = async (user) => {
    try {
      await userDao.lastConnection(user);
    } catch (error) {
      throw new Error(error);
    }
  };
  removeInactive = async () => {
    try {
      const inactiveUser = await userDao.removeInactive();
      inactiveUser.forEach((user) => {
        sendMail(user, "removeInactive");
      });
      return inactiveUser;
    } catch (error) {
      throw new Error(error);
    }
  };
}
