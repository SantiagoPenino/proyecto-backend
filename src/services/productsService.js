import ProductDao from "../dao/mongodb/ProductDao.js";

const productDao = new ProductDao();

export const getAll = async () => {
  try {
    const products = await productDao.getAll();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getById = async (id) => {
  try {
    const product = await productDao.getById(id);
    if (!product) return false;
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const create = async(obj) => {
  try {
    const newProduct = await productDao.create(obj);
    if (!newProduct) return false;
    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const update = async(id, obj) => {
  try {
    const updatedProduct = await productDao.update(obj, id);
    if (!updatedProduct) return false;
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const remove = async(id) => {
  try {
    const deletedProduct = await productDao.remove(id);
    if (!deletedProduct) return false;
    return deletedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};
