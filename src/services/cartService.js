import Services from "./class.services.js";
import persistence from "../persistence/repository/persistence.js";

const { cartDao, productDao } = persistence;

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  remove = async (id) => {
    try {
      const response = await cartDao.remove(id);
      return response || false;
    } catch (error) {
      throw new Error(error);
    }
  };

  addProductToCart = async (cartId, productId) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      const productExists = await productDao.getById(productId);

      if (!cartExists || !productExists) return false;

      const productExitsInCart = cartExists.products.find(
        (p) => p.product._id.toString() === productId.toString()
      );
      return productExitsInCart
        ? (productExitsInCart.quantity++,
          await cartExists.save(),
          productExitsInCart)
        : await cartDao.addProductToCart(cartExists, productId);
    } catch (error) {
      throw new Error(error);
    }
  };

  removeProductToCart = async (cartId, productId) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      const productExists = await productDao.getById(productId);
      if (!cartExists || !productExists) return false;
      const productExitsInCart = cartExists.products.find(
        (p) => p.product._id.toString() === productId.toString()
      );
      return productExitsInCart && productExitsInCart.quantity > 1
        ? (productExitsInCart.quantity--,
          await cartExists.save(),
          productExitsInCart)
        : await cartDao.removeProductToCart(cartExists, productId);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      if (!cartExists) return false;

      const productExits = cartExists.products.find(
        (p) => p.product._id.toString() === productId.toString()
      );
      if (!productExits) return false;
      return await cartDao.updateProductQuantity(
        cartExists,
        productId,
        quantity
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  emptyCart = async (cartId) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      if (!cartExists) return false;
      return await cartDao.emptyCart(cartExists);
    } catch (error) {
      throw new Error(error);
    }
  };
}
