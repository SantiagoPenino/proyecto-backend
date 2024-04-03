import Services from "./classServices.js";
import persistence from "../persistence/persistence.js";

const { cartDao, productDao } = persistence;

export default class CartServices extends Services {
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
      const carts = await cartDao.getAll(email);
      return !carts ? false : carts;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id, email) => {
    try {
      const cart = await cartDao.getById(id);
      if (!cart || cart.owner !== email) {
        return false;
      }
      const deletedCart = await cartDao.delete(id);
      return deletedCart;
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id, email) => {
    try {
      const cart = await cartDao.getById(id);
      if (!cart || cart.owner !== email) {
        return false;
      }
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  addProductToCart = async (cartId, productId, email) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      if (!cartExists || cartExists.owner !== email) return false;
      const productExists = await productDao.getById(productId);
      if (!productExists) return false;
      const productExistsInCart = cartExists.products.find((p) => {
        return p.product._id.toString() === productId.toString();
      });
      if (productExistsInCart) {
        productExistsInCart.quantity++;
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

  removeProductToCart = async (cartId, productId, email) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      if (!cartExists || cartExists.owner !== email) return false;
      const productExists = await productDao.getById(productId);
      if (!productExists) return false;
      const productExistsInCart = cartExists.products.find(
        (p) => p.product._id.toString() === productId.toString()
      );
      if (productExistsInCart && productExistsInCart.quantity > 0) {
        productExistsInCart.quantity--;
        await cartExists.save();
        return productExistsInCart;
      }
      return await cartDao.removeProductToCart(cartExists, productId);
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

  clearCart = async (cartId, email) => {
    try {
      const cartExists = await cartDao.getById(cartId);
      if (!cartExists || cartExists.owner !== email) {
        return false;
      }
      return await cartDao.clearCart(cartExists);
    } catch (error) {
      throw new Error(error);
    }
  };
}
