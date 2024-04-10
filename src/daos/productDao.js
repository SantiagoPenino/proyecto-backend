import MongoDao from "./mongoDao.js";
import { ProductModel } from "../models/productModel.js";

export default class ProductDao extends MongoDao {
  constructor() {
    super(ProductModel);
  }

  create = async (data) => {
    try {
      const newProduct = await ProductModel.create(data);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
