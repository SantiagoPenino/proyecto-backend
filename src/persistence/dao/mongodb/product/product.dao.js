import MongoDao from "../mongo.dao.js";
import { ProductModel } from "./product.model.js";

export default class ProductMongoDao extends MongoDao {
  constructor() {
    super(ProductModel);
  }

  create = async (product) => {
    try {
      const response = await this.model.create(product);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
}
