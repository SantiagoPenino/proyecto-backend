import { cartModel } from "./models/cartModel.js";
import { productModel } from "./models/productModel.js";

export default class CartDao {
  async create(obj) {
    try {
      const response = await cartModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      const response = await cartModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAll() {
    try {
      const response = await cartModel.find({});
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(obj, id) {
    try {
      const response = await cartModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async remove(id) {
    try {
      const response = await cartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const currentCart = await cartModel.findById(cid);

      if (currentCart) {
        const currentProductIndex = currentCart.products.findIndex(
          (p) => p.product.toString() === pid
        );

        if (currentProductIndex !== -1) {
          currentCart.products[currentProductIndex].quantity += 1;
        } else {
          const productToAdd = await productModel.findById(pid);
          if (productToAdd) {
            currentCart.products.push({
              product: productToAdd._id,
              quantity: 1,
            });
          } else {
            throw new Error("Product not found");
          }
        }

        await currentCart.save();

        return currentCart;
      } else {
        throw new Error("Cart not found");
      }
    } catch (error) {
      throw new Error("Error adding product to cart: " + error.message);
    }
  }
}
