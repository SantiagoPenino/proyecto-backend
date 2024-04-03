import CartServices from "../services/cartServices.js";
import Controllers from "./classControllers.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const cartServices = new CartServices();
export default class CartControllers extends Controllers {
  constructor() {
    super(cartServices);
  }

  create = async (req, res, next) => {
    try {
      const { email } = req.user;
      const newCart = await cartServices.create(req.body, email);
      return httpResponse.OK(res, newCart);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const { email } = req.user;
      const carts = await cartServices.getAll(email);
      return carts.length === 0
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_GET_ALL)
        : httpResponse.OK(res, items);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email } = req.user;
      const deletedCart = await cartServices.delete(id, email);
      return !deletedCart
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_CART)
        : httpResponse.OK(res, deletedCart);
    } catch (error) {
      next(error);
    }
  };

  addProductToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProduct } = req.params;
      const addProdToUserCart = await cartServices.addProductToCart(
        idCart,
        idProduct
      );
      return !addProdToUserCart
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_ADD_ITEM_TO_CART)
        : httpResponse.OK(res, addProdToUserCart);
    } catch (error) {
      next(error);
    }
  };

  removeProductToCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { itemId } = req.params;
      const deleteProdToUserCart = await cartServices.removeProductToCart(
        cartId,
        itemId
      );
      return !deleteProdToUserCart
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_ITEM_TO_CART)
        : httpResponse.OK(res, deleteProdToUserCart);
    } catch (error) {
      next(error);
    }
  };
  updateProductQuantityToCart = async (req, res, next) => {
    try {
      const { itemId, cartId } = req.params;
      const { quantity } = req.body;
      const updatedQuantity = await cartServices.updateProductQuantityToCart(
        cartId,
        itemId,
        quantity
      );
      return !updatedQuantity
        ? httpResponse.NOT_FOUND(res, "Error updating product quantity in cart")
        : httpResponse.OK(res, updatedQuantity);
    } catch (error) {
      next(error);
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
      next(error);
    }
  };
}
