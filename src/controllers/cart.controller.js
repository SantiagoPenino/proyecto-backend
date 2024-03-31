import CartService from "../services/cartService.js";
import Controllers from "../controllers/class.controllers.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const service = new CartService();
export default class CartController extends Controllers {
  constructor() {
    super(service);
  }

  createCart = async (req, res, next) => {
    try {
      const { email } = req.user;
      const newCart = await service.createCart(email);
      return httpResponse.OK(res, newCart);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const { email } = req.user;
      const carts = await service.getAll(email);
      return items.length === 0
        ? httpResponse.NOT_FOUND(res, dictionary.ERROR_GET_ALL)
        : httpResponse.OK(res, items);
    } catch (error) {
      next(error);
    }

    remove = async (req, res, next) => {
      try {
        const id = req.params.id;
        const deletedCart = await service.remove(id);
        return !deletedCart
          ? httpResponse.NOT_FOUND(res, dictionary.ERROR_DELETE_CART)
          : httpResponse.OK(res, deletedCart);
      } catch (error) {
        next(error);
      }
    };

    addProductToCart = async (req, res, next) => {
      try {
        const { cartId } = req.params;
        const { itemId } = req.params;
        const addProdToUserCart = await service.addProductToCart(
          cartId,
          itemId
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
        const deleteProdToUserCart = await service.removeProductToCart(
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
        const { itemId,cartId } = req.params;
        const { quantity } = req.body;
        const updateProductQuantity = await service.updateProductQuantityToCart(
          cartId,
          itemId,
          quantity
        );
        return !updateProductQuantity
          ? httpResponse.NOT_FOUND(
              res,
              "Error updating product quantity in cart"
            )
          : httpResponse.OK(res, updateProductQuantity);
      } catch (error) {
        next(error);
      }
    };

    emptyCart = async (req, res, next) => {
      try {
        const { cartId } = req.params;
        const emptyCart = await service.emptyCart(cartId);
        return !emptyCart
          ? httpResponse.NOT_FOUND(res, "Error emptying cart")
          : httpResponse.OK(res, emptyCart);
      } catch (error) {
        next(error);
      }
    };
  };
}
