import persistence from "./persistence.js";
import ProductResDTO from "../repository/product.res.dto.js";
import ProductReqDTO from "../repository/product.req.dto.js";

const { productDao } = persistence;

export default class ProductRepository {
  constuctor() {
    this.dao = productDao;
  }

  createProduct = async (product) => {
    try {
      const productDTO = new ProductReqDTO(product);
      return await this.dao.create(productDTO);
    } catch (error) {
      throw new Error("Error creating product");
    }
  };

  getProdudctById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      return !response ? null : new ProductResDTO(response);
    } catch (error) {
      throw new Error("Error getting product");
    }
  };
}
