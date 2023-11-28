import { cartModel } from "./models/cartModel";

export default class CartDao {
  async create(obj) {
    try {
      const response = await cartModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      const response = await cartModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAll() {
    try {
      const response = await cartModel.find({});
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(obj, id) {
    try {
      const response = await cartModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async remove(id) {
    try {
      const response = await cartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);
      const product = await cartModel.findById(pid);
      if (!cart || !product) return false;
      const response = await cartModel.addProduct(cid, pid);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
