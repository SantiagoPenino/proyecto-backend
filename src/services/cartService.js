import Services from "./classService.js";
import persistence from "../persistence/repository/persistence.js";

const { cartDao, productDao } = persistence;

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  create = async (cart, email) => {
    try {
      cart.owner = email;
      const newCart = await cartDao.create(cart);
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  };

  getAll = async (email) => {
    try {
      const response = await cartDao.getAll(email);
      return !response ? false : response;
    } catch (error) {
      throw new Error(error);
    }
  };

  remove = async (id, email) => {
    try {
      const cart = await cartDao.getById(id);
      const response = await cartDao.remove(id);
      return !cart ? false : cart.owner !== email ? false : response;
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id, email) => {
    try {
      const cart = await cartDao.getById(id);
      return !cart ? false : cart.owner !== email ? false : cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  addProductToCart = async (cartId, productId) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      const productExists = cartExists.products.find(
        (p) => p.product._id.toString() === productId.toString()
      );
      if (productExists) {
        productExists.quantity++;
        cartExists.save();
        const updatedCart = await cartDao.getById(cartId);
        return updatedCart;
      } else {
        const updatedCart = await cartDao.addProductToCart(
          cartExists,
          productId
        );
        return updatedCart;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  removeProductToCart = async (cartId, productId) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      const productExists = await productDao.getById(productId);
      if (!cartExists || !productExists) return false;
      const productExistsInCart = cartExists.products.find(
        (p) => p.product._id.toString() === productId.toString()
      );
      return productExistsInCart && productExistsInCart.quantity > 0
        ? (productExistsInCart.quantity--,
          await existCart.save(),
          productExistsInCart)
        : await cartDao.removeProdToCart(cartExists, productId);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      if (!cartExists) return false;

      const productExists = cartExists.products.find(
        (p) => p.product._id.toString() === productId.toString()
      );
      if (!productExists) return false;
      return await cartDao.updateProductQuantity(
        cartExists,
        productExists,
        quantity
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  clear = async (cartId) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      if (!cartExists) return false;
      return await cartDao.emptyCart(cartExists);
    } catch (error) {
      throw new Error(error);
    }
  };
}
