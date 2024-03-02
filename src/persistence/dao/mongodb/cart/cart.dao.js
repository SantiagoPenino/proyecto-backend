import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartMongoDao extends MongoDao {
  constructor() {
    super(CartModel);
  }

  addProductToCart = async (cartExists, itemId) => {
    try {
      const newProduct = {
        quantity: 1,
        product: itemId,
      };
      cartExists.products.push(newProduct);
      const response = await this.model.updateOne(
        { _id: cartExists._id },
        cartExists
      );
      return response;
    } catch (error) {
      throw new Error("Error adding product to cart");
    }
  };

  removeProductToCart = async (cartExists, itemId) => {
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

      const updatedCart = await this.model.findByIdAndUpdate(
        cartExists._id,
        { $pull: { products: { product: productToRemove._id } } },
        { new: true }
      );
      if (!updatedCart) {
        throw new Error("Product not found in cart");
      }

      return updatedCart;
    } catch (error) {
      throw new Error("Error removing product from cart");
    }
  };

  emptyCart = async (cart) => {
    try {
      if (!cart) {
        throw new Error("Cart not found");
      }
      const updatedCart = await this.model.findByIdAndUpdate(
        cart._id,
        { $set: { products: [] } },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      throw new Error("Error emptying cart");
    }
  };
}
