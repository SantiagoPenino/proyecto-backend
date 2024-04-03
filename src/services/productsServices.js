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
      const product = await productDao.create(data);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };

  getProduct = async (id) => {
    try {
      const product = await productRepository.getProduct(id);
      return product || false;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      let product = await this.dao.getProduct(id);
      const user = await userDao.getByEmail(product.owner);
      if (!item) {
        return false;
      } else {
        const deletedProduct = await this.dao.delete(id);
        await sendMail(user, deletedProduct);
        return deletedProduct;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}
