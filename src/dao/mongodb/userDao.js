import { userModel } from "./models/userModel.js";

export default class UserDao {
  async findByEmail(email) {
    try {
      const response = await userModel.findOne({ email });
      return response;
    } catch (error) {
      throw new Error("Error getting user by email");
    }
  }
  async create(user) {
    try {
      const { email } = user;
      const exists = await this.findByEmail(email);
      if (exists) {
        return null;
      }
      const response = await userModel.create(user);
      return response;
    } catch (error) {
      throw new Error("Error adding user");
    }
  }
  async login(email, password) {
    try {
      const response = await userModel.findOne({ email, password });
      if (!response) {
        return null;
      }
      return response;
    } catch (error) {
      throw new Error("Error getting user by email");
    }
  }
}
