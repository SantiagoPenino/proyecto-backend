import Services from "./classServices.js";
import persistence from "../persistence/persistence.js";
import { sendMail } from "./mailingServices.js";

const { userDao } = persistence;

export default class UserServices extends Services {
  constructor() {
    super(userDao);
  }

  register = async (user) => {
    try {
      const newUser = await userDao.register(user);
      await sendMail(user, "register");
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  login = async (user) => {
    try {
      const { token, userId } = await userDao.login(user);
      if (token && userId) {
        await this.lastConnection(userId);
        return { token, userId };
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
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
  lastConnection = async (userId) => {
    try {
      await userDao.lastConnection(userId);
    } catch (error) {
      throw new Error(error);
    }
  };
  deleteInactive = async () => {
    try {
      const inactiveUsers = await userDao.removeInactive();
      inactiveUsers.forEach((user) => {
        sendMail(user, "removeInactive");
      });
      return inactiveUsers;
    } catch (error) {
      throw new Error(error);
    }
  };
}
