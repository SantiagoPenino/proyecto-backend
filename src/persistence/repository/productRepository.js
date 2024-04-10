import persistence from "../persistence.js";
import ProductDTO from "./productDto.js";

const { productDao } = persistence;

export default class ProductRepository {
  constuctor() {
    this.dao = productDao;
  }

  getProductById = async (id) => {
    try {
      const product = await productDao.getById(id);
      return new ProductDTO(product);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
