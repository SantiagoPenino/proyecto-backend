import Services from "./classService.js";
import ProductRepository from "../persistence/repository/productRepository.js";
import persistence from "../persistence/repository/persistence.js";
import { generateProduct } from "../utils/utils";

const { productDao } = persistence;
const productRepository = new ProductRepository(productDao);

export default class ProductService extends Services {
  constructor() {
    super(productDao);
  }

  createMockProduct = async (quantity = 100) => {
    try {
      const productsArray = Array.from({ length: quantity }, generateProduct());
      const products = await productDao.create(productsArray);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  };

  createProduct = async (product) => {
    try {
      const newProduct = await productRepository.createProduct(product);
      return newProduct || false;
    } catch (error) {
      throw new Error(error);
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productRepository.getProdudctById(id);
      return product || false;
    } catch (error) {
      throw new Error(error);
    }
  };
}
