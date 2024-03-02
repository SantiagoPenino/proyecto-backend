import Controllers from "./class.controllers.js";
import ProductService from "../services/products.service.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const HttpResponse = new HttpResponse();

export default class ProductController extends Controllers {
  constructor() {
    super(ProductService);
  }

  createMockProduct = async (req, res, next) => {
    try {
      const { quantity } = req.query;
      const response = await ProductService.createMockProduct(quantity);
      return !response
        ? HttpResponse.NOT_FOUND(res, dictionary.ERROR_CREATE_ITEM)
        : HttpResponse.OK(res, response);
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      return !newProduct
        ? HttpResponse.NOT_FOUND(res, dictionary.ERROR_CREATE_ITEM)
        : HttpResponse.OK(res, newProduct);
    } catch (error) {
      next(error);
    }

    getProductById = async (req, res, next) => {
      try {
        const { id } = req.params;
        const response = await ProductService.getProductById(id);
        return !response
          ? HttpResponse.NOT_FOUND(res, dictionary.ERROR_FIND_ITEM)
          : HttpResponse.OK(res, response);
      } catch (error) {
        next(error);
      }
    };
  };
}
