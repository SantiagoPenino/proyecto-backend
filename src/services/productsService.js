import ProductDao from "../dao/mongodb/ProductDao.js";

const productDao = new ProductDao();

export const getAll = async () => {
  try {
    const products = await productDao.getAll();
    return products;
  } catch (error) {
    throw new Error(`Error en getAll: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const product = await productDao.getById(id);
    return product;
  } catch (error) {
    throw new Error(`Error getById: ${error.message}`);
  }
};

export const create = async (obj) => {
  try {
    const newProduct = await productDao.create(obj);
    return newProduct;
  } catch (error) {
    throw new Error(`Error create: ${error.message}`);
  }
};

export const update = async (id, obj) => {
  try {
    const updatedProduct = await productDao.update(obj, id);
    return updatedProduct;
  } catch (error) {
    throw new Error(`Error update: ${error.message}`);
  }
};

export const remove = async (id) => {
  try {
    const deletedProduct = await productDao.remove(id);
    return deletedProduct;
  } catch (error) {
    throw new Error(`Error remove: ${error.message}`);
  }
};

export const filter = async (category) => {
  try {
    const products = await productDao.filter(category);
    return products;
  } catch (error) {
    throw new Error(`Error aggregation1: ${error.message}`);
  }
};
