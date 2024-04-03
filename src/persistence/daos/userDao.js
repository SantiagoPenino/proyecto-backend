import MongoDao from "./mongoDao.js";
import { UserModel } from "../models/userModel.js";
import { createHash, isValidPassword } from "../../utils/utils.js";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

export default class UserDao extends MongoDao {
  constructor() {
    super(UserModel);
  }

  newToken(user, expirationTime) {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY_JWT, {
      expiresIn: expirationTime,
    });
    return token;
  }

  register = async (user) => {
    try {
      const { email, password } = user;
      const userExists = await this.model.findOne({ email });
      return !userExists
        ? email === "admin@coder.com" && password === "admin"
          ? await this.model.create({
              ...user,
              password: createHash(password),
              role: "admin",
            })
          : await this.model.create({ ...user, password: createHash(password) })
        : false;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExists = await this.getByEmail(email);
      if (userExists) {
        const validPassword = isValidPassword(userExists, password);
        if (!validPassword) return false;
        else return this.newToken(userExists, "30m");
      }
      return false;
    } catch (error) {
      throw new Error(error).message;
    }
  };

  getByEmail = async (email) => {
    try {
      const userExists = await this.model.findOne({ email });
      if (userExists) return userExists;
      else return false;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  resetPassword = async (user) => {
    try {
      const { email } = user;
      const userExists = await this.model.findOne({ email });
      return userExists ? this.newToken(userExists, "1h") : false;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updatePassword = async (user, password) => {
    try {
      return isValidPassword(user, password)
        ? false
        : await this.update(user._id, { password: createHash(password) });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  lastConnection = async (userId) => {
    try {
      const currentDate = new Date();
      await this.model.findByIdAndUpdate(userId, {
        lastConnection: currentDate,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  deleteInactive = async () => {
    try {
      const inactiveUsers = await this.model.find({
        lastConnection: {
          $lt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      });
      await this.model.deleteMany({
        _id: { $in: inactiveUsers.map((user) => user._id) },
      });
      return inactiveUsers;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
