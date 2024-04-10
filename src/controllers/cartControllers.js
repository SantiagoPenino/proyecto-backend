import CartServices from "../services/cartServices.js";
import Controllers from "./classControllers.js";
import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const cartServices = new CartServices();

export default class CartControllers extends Controllers {
  constructor() {
    super(cartServices);
  }

  createCart = async (req, res, next) => {
    try {
      const { email } = req.user;
      const newCart = await cartServices.createCart(req.body, email);
      return httpResponse.OK(res, newCart);
    } catch (error) {
      next(error.message);
    }
  };

  getAllCarts = async (req, res, next) => {
    try {
      const { email } = req.user;
      const carts = await cartServices.getAll(email);
      return carts.length === 0
        ? httpResponse.NOT_FOUND(res, "Cart not found")
        : httpResponse.OK(res, carts);
    } catch (error) {
      next(error.message);
    }
  };

  addProductToCart = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { idCart, idProduct } = req.params;
      const product = await cartServices.addProductToCart(
        idCart,
        idProduct,
        email
      );
      return !product
        ? httpResponse.NOT_FOUND(res, "Error adding product to cart")
        : httpResponse.OK(res, product);
    } catch (error) {
      next(error.message);
    }
  };

  removeProductToCart = async (req, res, next) => {
    try {
      const { idCart, idProduct } = req.params;
      const { email } = req.user;
      const product = await cartServices.removeProductToCart(
        idCart,
        idProduct,
        email
      );
      return !product
        ? httpResponse.NOT_FOUND(res, "Error removing product from cart")
        : httpResponse.OK(res, product);
    } catch (error) {
      next(error.message);
    }
  };
  updateProductQuantity = async (req, res, next) => {
    try {
      const { idCart, idProduct } = req.params;
      const { quantity } = req.body;
      const product = await cartServices.updateProductQuantity(
        idCart,
        idProduct,
        quantity
      );
      return !product
        ? httpResponse.NOT_FOUND(res, "Error updating product quantity in cart")
        : httpResponse.OK(res, product);
    } catch (error) {
      next(error.message);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { email } = req.user;
      const cart = await cartServices.clearCart(idCart, email);
      return !cart
        ? httpResponse.NOT_FOUND(res, "Error emptying cart")
        : httpResponse.OK(res, cart);
    } catch (error) {
      next(error.message);
    }
  };
}
