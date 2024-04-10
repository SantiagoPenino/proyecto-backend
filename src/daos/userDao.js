import MongoDao from "./mongoDao.js";
import { UserModel } from "../models/userModel.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const SECRET_KEY = config.SECRET_KEY;

export default class UserDao extends MongoDao {
  constructor() {
    super(UserModel);
  }

  generateToken(user) {
    try {
      const payload = {
        idUser: user._id,
      };
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "30m",
      });
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  register = async (user) => {
    try {
      const { email, password } = user;
      const userExists = await this.model.findOne({ email });
      if (!userExists) {
        if (email === "admin@coder.com" && password === "admin") {
          const newUser = await this.model.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
          return newUser;
        } else {
          const newUser = await this.model.create({
            ...user,
            password: createHash(password),
          });
          return newUser;
        }
      } else {
        return false;
      }
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
        else {
          const token = this.generateToken(userExists);
          return { token, idUser: userExists._id };
        }
      }
      return false;
    } catch (error) {
      throw new Error(error).message;
    }
  };

  getByEmail = async (email) => {
    try {
      const user = await this.model.findOne({ email });
      return user || false;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  resetPassword = async (user) => {
    try {
      const { email } = user;
      const userExists = await this.model.findOne({ email });
      return userExists ? this.generateToken(userExists, "30m") : false;
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

  lastConnection = async (idUser) => {
    try {
      const currentDate = new Date();
      await this.model.findByIdAndUpdate(idUser, {
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
  updateImage = async (idUser, path) => {
    try {
      const user = await this.model.findOneAndUpdate(
        {
          _id: idUser,
        },
        { $set: { image: path } },
        { new: true }
      );
      if (idUser.role !== "admin" || idUser.role !== "premium") {
        const user = await this.model.findOneAndupdate(
          {
            _id: idUser,
          },
          { $set: { image: path } },
          { new: true }
        );
        return user;
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
