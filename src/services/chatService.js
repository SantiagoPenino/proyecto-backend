import MessageManager from "../dao/mongodb/ChatDao.js";

const messageManager = new MessageManager();

export const create = async (obj) => {
    try {
        const response = await messageManager.create(obj);
        return response;
    } catch (error) {
        throw new Error("Message could not be created" + error.message);
    }
};

export const getAll = async () => {
    try {
        const response = await messageManager.getAll();
        return response;
    } catch (error) {
        throw new Error("Error getting all messages");
    }
};