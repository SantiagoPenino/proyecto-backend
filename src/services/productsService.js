import Services from "./classService.js";
import ProductRepository from "../persistence/repository/productRepository.js";
import persistence from "../persistence/repository/persistence.js";
import { sendMail } from "./mailService.js";

const { productDao, userDao } = persistence;
const productRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super(productDao);
  }

  create = async (product, email) => {
    try {
      product.productOwner = email;
      const newProduct = await productRepository.create(product);
      return newProduct || false;
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const product = await productRepository.getById(id);
      return product || false;
    } catch (error) {
      throw new Error(error);
    }
  };
}

remove = async (id, email) => {
  try {
    const response = await productDao.getById(id);
    const user = await userDao.getById(response.productOwner);
    return !item
      ? false
      : (await this.dao.delete(id),
        await sendMail(user, "deleteproduct"),
        itemDeleted);
  } catch (error) {
    throw new Error(error);
  }
};
