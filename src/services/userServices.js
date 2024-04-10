import Services from "./classServices.js";
import persistence from "../persistence/persistence.js";
import { sendMail } from "./mailingServices.js";

const { userDao } = persistence;

export default class userModel extends Services {
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
      const { token, idUser } = await userDao.login(user);
      if (token && idUser) {
        await this.lastConnection(idUser);
        return { token, idUser };
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
      throw new Error(error.message);
    }
  };

  updatePassword = async (user, password) => {
    try {
      const response = await this.dao.updatePassword(user, password);
      return response || false;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  lastConnection = async (idUser) => {
    try {
      await userDao.lastConnection(idUser);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  deleteInactive = async () => {
    try {
      const inactiveUsers = await userDao.deleteInactive();
      inactiveUsers.forEach((user) => {
        sendMail(user, "removeInactive");
      });
      return inactiveUsers;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  uploader = async (user, path) => {
    try {
      const idUser = await userDao.getById(user);
      if (!idUser) {
        return false;
      } else {
        const user = await userDato.updateImage(idUser, path);
        return user;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
