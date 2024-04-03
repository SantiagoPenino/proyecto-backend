import MongoDao from "./mongoDao.js";
import { CartModel } from "../models/cartModel.js";

export default class CartDao extends MongoDao {
  constructor() {
    super(CartModel);
  }

  create = async (cart) => {
    try {
      const response = await this.model.create(cart);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  getAll = async (email) => {
    try {
      const response = await this.model.find({ email });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  addProductToCart = async (cartExists, itemId) => {
    try {
      const newProduct = {
        quantity: 1,
        product: itemId,
      };
      cartExists.products.push(newProduct);
      await this.model.updateOne({ _id: cartExists._id }, cartExists);
      const response = await CartModel.find({
        _id: cartExists._id,
      });
      return response;
    } catch (error) {
      throw new Error(error);
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

  clear = async (cart) => {
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
