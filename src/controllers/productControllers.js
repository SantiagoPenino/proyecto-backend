import Controllers from "./classControllers.js";
import ProductServices from "../services/productsServices.js";
import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const productServices = new ProductServices();

export default class ProductControllers extends Controllers {
  constructor() {
    super(productServices);
  }

  create = async (req, res, next) => {
    try {
      const { email } = req.user;
      const data = req.body;
      const newProduct = await productServices.create(data, email);
      return httpResponse.OK(res, newProduct);
    } catch (error) {
      next(error.message);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { data } = req.params;
      const product = await this.service.getById(data);
      if (!product) {
        return httpResponse.NOT_FOUND(res, "Error getting product");
      } else {
        if (req.user.role === "admin" || email === product.owner) {
          const productDeleted = await productServices.delete(data);
          return httpResponse.OK(res, productDeleted);
        } else {
          return httpResponse.UNAUTHORIZED(res, "Error deleting product");
        }
      }
    } catch (error) {
      next(error.message);
    }
  };
}
