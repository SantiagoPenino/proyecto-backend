import Services from "./classServices.js";
import persistence from "../persistence/persistence.js";
import { sendMail } from "./mailingServices.js";
import ProductRepository from "../persistence/repository/productRepository.js";

const { productDao, userDao } = persistence;
const productRepository = new ProductRepository();

export default class ProductServices extends Services {
  constructor() {
    super(productDao);
  }

  create = async (data, email) => {
    try {
      data.owner = email;
      const newProduct = await productDao.create(data);
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productRepository.getProductById(id);
      return product || false;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      let product = await this.dao.getById(id);
      const user = await userDao.getByEmail(product.owner);
      if (!product) {
        return false;
      } else {
        const deletedProduct = await this.dao.delete(id);
        await sendMail(user, "deletedProduct");
        return deletedProduct;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}
