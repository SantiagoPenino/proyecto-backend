import Controllers from "./class.controllers.js";
import ProductService from "../services/productsService.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const service = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(service);
  }

  createProduct = async (req, res, next) => {
    try {
      const { email } = req.user;
      const newProduct = await service.createProduct(req.body, email);
      return !newProduct
        ? HttpResponse.NOT_FOUND(res, dictionary.ERROR_CREATE_ITEM)
        : HttpResponse.OK(res, newProduct);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { id } = req.params;
      const response = await service.getById(id);
      return !response
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_ITEM)
        : req.user.role !== "admin"
        ? email !== item.productOwner
          ? httpResponse.UNAUTHORIZED(res, dictionary.ERROR_TOKEN)
          : await service
              .remove(id)
              .then((deleteProd) => httpResponse.OK(res, deleteProd))
        : await service
            .remove(id)
            .then((deleteProd) => httpResponse.OK(res, deleteProd));
    } catch (error) {
      next(error);
    }
  };
}
