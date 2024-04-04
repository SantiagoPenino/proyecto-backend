import MongoDao from "./mongoDao.js";
import { ProductModel } from "../models/productModel.js";

export default class ProductDao extends MongoDao {
  constructor() {
    super(ProductModel);
  }

  create = async (data) => {
    try {
      const product = await this.model.create(data);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };
}
