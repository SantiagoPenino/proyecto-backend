import fs from "fs";

export class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  async addProduct(obj) {
    try {
      const product = {
        id: (await this.#getMaxId()) + 1,
        status: true,
        ...obj,
      };
      const products = await this.getProducts();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async #getMaxId() {
    try {
      const products = await this.getProducts();
      if (products.length === 0) return 0;
      let maxId = 0;
      products.forEach((product) => {
        if (product.id > maxId) {
          maxId = product.id;
        }
      });
      return maxId;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productsJSON = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(productsJSON);
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getProductsByLimit(limit) {
    try {
      const products = await this.getProducts();
      if (!limit || limit >= products.length) {
        return products;
      } else {
        return products.slice(0, limit);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === productId);
      if (product) {
        return product;
      } else {
        console.error("Product not found...");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(obj, id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((prod) => prod.id === id);
      if (index === -1) {
        return false;
      } else {
        const prodUpdated = { id,...obj};
        products[index] = prodUpdated;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.getProducts();
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );

      if (products.length === updatedProducts.length) {
        console.error("Product not found...");
        return;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
    } catch (error) {
      console.log(error);
    }
  }
}