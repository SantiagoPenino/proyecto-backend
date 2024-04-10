import MongoDao from "./mongoDao.js";
import { CartModel } from "../models/cartModel.js";

export default class CartDao extends MongoDao {
  constructor() {
    super(CartModel);
  }

  createCart = async (cart) => {
    try {
      const newCart = await CartModel.createCart(cart);
      return newCart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getAllCarts = async (email) => {
    try {
      const carts = await CartModel.find({ owner: email });
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addProductToCart = async (cartExists, idProduct) => {
    try {
      const product = {
        quantity: 1,
        product: idProduct,
      };
      cartExists.products.push(product);
      await this.model.updateOne({ _id: cartExists._id }, cartExists);
      const cart = await CartModel.find({
        _id: cartExists._id,
      });
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  removeProductToCart = async (cartExists, productToRemove) => {
    try {
      if (!cartExists) {
        throw new Error("Cart not found");
      }
      if (!cartExists.products || cartExists.products.length === 0) {
        throw new Error("Cart is empty");
      }
      if (!productToRemove._id) {
        throw new Error("Product not found");
      }
      const productIndex = cartExists.products.findIndex(
        (prod) => prod.product._id.toString() === productToRemove._id.toString()
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cartExists.products.splice(productIndex, 1);
      const updatedCart = await cartExists.save();
      return updatedCart;
    } catch (error) {
      throw new Error("Error removing product from cart");
    }
  };

  clearCart = async (cart) => {
    try {
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.products = [];
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw new Error("Error emptying cart");
    }
  };
}
