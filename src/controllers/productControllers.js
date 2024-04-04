import Controllers from "./classControllers.js";
import ProductServices from "../services/productsServices.js";
import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const productServices = new ProductServices();

export default class ProductControllers extends Controllers {
  constructor() {
    super(productServices);
  }

  createProduct = async (req, res, next) => {
    try {
      const { email } = req.user;
      const data = req.body;
      const response = await productServices.createProduct(data, email);
      return httpResponse.OK(res, response);
    } catch (error) {
      next(error.message);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { productId } = req.params;
      const item = await this.service.getById(productId);
      if (!item) {
        return httpResponse.NOT_FOUND(res, "Error getting item");
      } else {
        if (req.user.role === "admin" || email === item.owner) {
          const itemToDelete = await productServices.deleteProduct(productId);
          return httpResponse.OK(res, itemToDelete);
        } else {
          return httpResponse.UNAUTHORIZED(res, "Error deleting item");
        }
      }
    } catch (error) {
      next(error.message);
    }
  };
}
