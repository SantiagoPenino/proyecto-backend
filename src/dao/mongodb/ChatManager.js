import { messageModel } from "./models/messageModel.js";

export default class MessageManager {
  async createMsg(obj) {
    try {
      const maxId = await this.getMaxId();
      const newMsg = new msgModel({
        id: maxId + 1,
        ...obj,
      });
      await newMsg.save();
      return newMsg;
    } catch (error) {
      throw new Error("Error creating a message");
    }
  }
  async getMaxId() {
    try {
      const maxIdMsg = await messageModel
        .findOne({}, { id: 1 })
        .sort({ id: -1 });
      if (maxIdMsg) {
        return maxIdMsg.id;
      } else {
        return 0;
      }
    } catch (error) {
      throw new Error("Error getting max id");
    }
  }

  async getAll() {
    try {
      const msgs = await messageModel.find({});
      return msgs;
    } catch (error) {
      throw new Error("Error getting all messages");
    }
  }

  async getById(id) {
    try {
      const msg = await messageModel.findOne({ id });
      return msg || false;
    } catch (error) {
      throw new Error("Error getting message by ID");
    }
  }

  async updateMsg(obj, id) {
    try {
      const updatedMsg = await messageModel.findOneAndUpdate({ id }, obj, {
        new: true,
      });
      if (!updatedMsg) {
        throw new Error(`Id ${id} not found`);
      }
      return updatedMsg;
    } catch (error) {
      throw new Error("Error updating message");
    }
  }

  async deleteMsg(id) {
    try {
      const deletedMsg = await messageModel.findOneAndDelete({ id });
      if (!deletedMsg) {
        throw new Error(`Id ${id} not found`);
      }
      return deletedMsg;
    } catch (error) {
      throw new Error("Error deleting message");
    }
  }

  async deleteMsgs() {
    try {
      await messageModel.deleteMany({});
    } catch (error) {
      throw new Error("Error deleting all messages");
    }
  }
}
