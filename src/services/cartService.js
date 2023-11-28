import CartDao from "../dao/mongodb/CartDao.js";
import ProductDao from "../dao/mongodb/ProductDao.js";

const cartDao = new CartDao();
const productDao = new ProductDao();

export const getAll = async () => {
  try {
    const carts = await cartDao.getAll();
    return carts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    if (!cart) return false;
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const create = async (obj) => {
  try {
    const newCart = await cartDao.create(obj);
    if (!newCart) return false;
    return newCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const update = async (obj, id) => {
  try {
    const updatedCart = await cartDao.update(obj, id);
    if (!updatedCart) return false;
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const remove = async (id) => {
  try {
    const deletedCart = await cartDao.remove(id);
    if (!deletedCart) return false;
    return deletedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

