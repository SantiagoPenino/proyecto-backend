import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { createHash, isValidPassword } from "../../utils/utils.js";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

export default class UserMongoDao extends MongoDao {
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
        ? await this.model.create({ ...user, password: createHash(password) })
        : null;
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExists = await this.model.findOne({ email });
      return userExists && isValidPassword(userExists, password)
        ? this.newToken(userExists, "30m")
        : false;
    } catch (error) {
      throw new Error(error);
    }
  };

  getByEmail = async (email) => {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  };
  resetPassword = async (user) => {
    try {
      const { email } = user;
      const userExists = await this.model.findOne({ email });
      return userExists ? this.newToken(userExists, "1h") : false;
    } catch (error) {
      throw new Error(error);
    }
  };

  updatePassword = async (user, password) => {
    try {
      return isValidPassword(user, password)
        ? false
        : await this.update(user._id, { password: createHash(password) });
    } catch (error) {
      throw new Error(error);
    }
  };
}
