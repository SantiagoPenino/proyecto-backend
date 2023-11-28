import MessageManager from "../dao/mongodb/ChatDao";

const message = new MessageManager();

export const getAll = async () => {
    try {
        const messages = await message.getAll();
        return messages;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const create = async (obj) => {
    try {
        const newMessage = await message.create(obj);
        if (!newMessage) return false;
        return newMessage;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const remove = async (id) => {
    try {
        const deleted = await message.remove(id);
        if (!deleted) return false;
        return deleted;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const removeMany = async () => {
    try {
        await message.removeMany();
    } catch (error) {
        throw new Error(error.message);
    }
};