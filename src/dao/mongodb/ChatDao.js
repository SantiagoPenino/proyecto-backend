import { messageModel } from "./models/messageModel.js";

export default class MessageManager {
  async create(obj) {
    try {
      const response = await messageModel.create(obj);
      return response;
    } catch (error) {
      throw new Error("Message could not be created");
    }
  }

  async getAll() {
    try {
      const response = await messageModel.find({});
      return response;
    } catch (error) {
      throw new Error("Error getting all messages");
    }
  }
  async remove(id) {
    try {
      const response = await messageModel.findOneAndDelete({ id });
      if (!response) {
        throw new Error(`Message ${id} not found`);
      }
      return deletedMsg;
    } catch (error) {
      throw new Error("Error deleting message");
    }
  }

  async removeMany() {
    try {
      await messageModel.deleteMany({});
    } catch (error) {
      throw new Error("Error deleting all messages");
    }
  }
}
