import { productModel } from "./models/productModel.js";

export default class ProductDao {
  async create(obj) {
    try {
      const response = await productModel.create(obj);
      return response;
    } catch (error) {
      throw new Error("Error adding product");
    }
  }

  async getAll() {
    try {
      const response = await productModel.find({}).lean();
      return response;
    } catch (error) {
      throw new Error("Error getting products");
    }
  }

  async getById(id) {
    try {
      const response = await productModel.findById(id);
      return response;
    } catch (error) {
      throw new Error("Error getting product by id");
    }
  }

  async update(obj, id) {
    try {
      const response = await productModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error("Error updating product");
    }
  }

  async remove(id) {
    try {
      const response = await productModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }

  async filter(category) {
    try {
      const response = await productModel.aggregate([
        {
          $match: { category: category },
        },
        { $sort: { price: 1 } },
      ]);
      return response;
    } catch (error) {
      throw new Error("Error filter products");
    }
  }
}
