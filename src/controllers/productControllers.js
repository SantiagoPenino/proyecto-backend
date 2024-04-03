import Controllers from "./classControllers.js";
import ProductServices from "../services/productsServices.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const productServices = new ProductServices();

export default class ProductControllers extends Controllers {
  constructor() {
    super(productServices);
  }

  create = async (req, res, next) => {
    try {
      const { email } = req.user;
      const newProduct = await productServices.create(req.body, email);
      return httpResponse.OK(res, newProduct);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { id } = req.params;
      let product = await this.service.getById(id);
      if (!product) {
        return httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_ITEM);
      } else {
        if (req.user.role === "admin" || email === product.owner) {
          const deletedProduct = await productServices.delete(id);
          return httpResponse.OK(res, deletedProduct);
        } else {
          return httpResponse.UNAUTHORIZED(res, dictionary.UNAUTHORIZED);
        }
      }
    } catch (error) {
      next(error);
    }
  };
}
