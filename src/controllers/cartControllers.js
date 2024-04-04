import CartServices from "../services/cartServices.js";
import Controllers from "./classControllers.js";
import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const cartServices = new CartServices();

export default class CartControllers extends Controllers {
  constructor() {
    super(cartServices);
  }

  addProductToCart = async (req, res, next) => {
    try {
      const { cartId, productId } = req.params;
      const data = await cartServices.addProductToCart(cartId, productId);
      return !data
        ? httpResponse.NOT_FOUND(res, "Error adding product to cart")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };

  removeProductToCart = async (req, res, next) => {
    try {
      const { cartId, productId } = req.params;
      const data = await cartServices.removeProductToCart(cartId, productId);
      return !data
        ? httpResponse.NOT_FOUND(res, "Error removing product from cart")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };
  updateProductQuantityToCart = async (req, res, next) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;
      const data = await cartServices.updateProductQuantityToCart(
        cartId,
        productId,
        quantity
      );
      return !data
        ? httpResponse.NOT_FOUND(res, "Error updating product quantity in cart")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };

  updateCart = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { products } = req.body;
      const data = await cartServices.updateCart(id, products);
      return !data
        ? httpResponse.NOT_FOUND(res, "Error updating cart")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const emptyCart = await cartServices.clearCart(cartId);
      return !emptyCart
        ? httpResponse.NOT_FOUND(res, "Error emptying cart")
        : httpResponse.OK(res, emptyCart);
    } catch (error) {
      next(error.message);
    }
  };
}
