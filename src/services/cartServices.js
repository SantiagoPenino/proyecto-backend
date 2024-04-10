import Services from "./classServices.js";
import persistence from "../persistence/persistence.js";

const { cartDao, productDao } = persistence;

export default class CartServices extends Services {
  constructor() {
    super(cartDao);
  }

  createCart = async (cart, email) => {
    try {
      cart.owner = email;
      const newCart = await cartDao.createCart(cart);
      return newCart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getAllCarts = async (email) => {
    try {
      const carts = await cartDao.getAllCarts(email);
      return !carts ? false : carts;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getCartById = async (idCart, email) => {
    try {
      const cart = await cartDao.getCartById(idCart);
      if (!cart || cart.owner !== email) {
        return false;
      }
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addProductToCart = async (idCart, idProduct, email) => {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      if (!cartExists || cartExists.owner !== email) return false;
      const productExists = await productDao.getProductById(idProduct);
      if (!productExists) return false;
      const productExistsInCart = cartExists.products.find((p) => {
        return p.product._id.toString() === idProduct.toString();
      });
      if (productExistsInCart) {
        productExistsInCart.quantity++;
        cartExists.save();
        const updatedCart = await cartDao.getById(idCart);
        return updatedCart;
      } else {
        const updatedCart = await cartDao.addProductToCart(
          cartExists,
          idProduct
        );
        return updatedCart;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  removeProductToCart = async (idCart, idProduct, email) => {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      if (!cartExists || cartExists.owner !== email) return false;
      const productExists = await productDao.getProductById(idProduct);
      if (!productExists) return false;
      const productExistsInCart = cartExists.products.find(
        (p) => p.product._id.toString() === idProduct.toString()
      );
      if (productExistsInCart && productExistsInCart.quantity > 0) {
        productExistsInCart.quantity--;
        await cartExists.save();
        return productExistsInCart;
      }
      return await cartDao.removeProductToCart(cartExists, idProduct);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateProductQuantity = async (idCart, idProduct, quantity) => {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      if (!cartExists) return false;

      const productExists = cartExists.products.find(
        (p) => p.product._id.toString() === idProduct.toString()
      );
      if (!productExists) return false;
      return await cartDao.updateProductQuantity(
        cartExists,
        productExists,
        quantity
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  clearCart = async (idCart, email) => {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      if (!cartExists || cartExists.owner !== email) {
        return false;
      }
      return await cartDao.clearCart(cartExists);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
