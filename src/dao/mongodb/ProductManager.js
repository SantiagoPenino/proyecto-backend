import { productModel } from "./models/productModel.js";

export class ProductManager {
  async addProduct(obj) {
    try {
      const duplicatedCode = await productModel.findOne({ code: obj.code });
      if (duplicatedCode) {
        console.log("Duplicated code");
        throw new Error("Duplicated code");
      }
      const newProduct = new productModel({
        id: (await this.getMaxId()) + 1,
        status: true,
        ...obj,
      });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error(error)
      throw new Error("Error adding product");
    }
  }

  async getMaxId() {
    try {
      const maxIdProduct = await productModel.findOne({}, { id: 1 }).sort({
        id: -1,
      });
      if (maxIdProduct) {
        return maxIdProduct.id;
      } else {
        return 0;
      }
    } catch (error) {
      throw new Error("Error getting max id");
    }
  }

  async getProducts() {
    try {
      const products = await productModel.find({});
      return products;
    } catch (error) {
      throw new Error("Error getting products");
    }
  }

  async getProductsByLimit(limit) {
    try {
      const products = await productModel.find({}).limit(limit);
      return products;
    } catch (error) {
      throw new Error("Error getting products by limit");
    }
  }

  async getProductById(pid) {
    try {
      const product = await productModel.findOne({ id: pid });
      if (product) {
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw new Error("Error getting product by id");
    }
  }

  async updateProduct(obj, id) {
    try {
      const updatedProduct = await productModel.findOneAndUpdate(
        { _id: id },
        obj,
        { new: true }
      );
      if (!updatedProduct) {
        return false;
      }
      return updatedProduct;
    } catch (error) {
      throw new Error("Error updating product");
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await productModel.findByIdAndDelete({
        _id: productId,
      });
      if (!deletedProduct) {
        console.error("Product not found");
        return;
      }
    } catch (error) {
      console.error(error)
      throw new Error("Error deleting product");
    }
  }
}
