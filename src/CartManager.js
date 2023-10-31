import fs from "fs";

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const cartsJSON = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(cartsJSON);
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const carts = await this.getCarts();
    carts.map((cart) => {
      if (cart.id > maxId) {
        maxId = cart.id;
      }
    });
    return maxId;
  }

  async addCart() {
    try {
      const cart = {
        id: (await this.#getMaxId()) + 1,
        products: [],
      };
      const cartsFile = await this.getCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById() {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === id);
      if (!cart) {
        return false;
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(idCart, idProd) {
    const carts = await this.getCarts();
    const cartExists = await this.getCartById(idCart);
    if (cartExists) {
      const prodExists = cartExists.products.find((prod) => prod.id === idProd);
      if (prodExists) {
        prodExists.quantity++;
      } else {
        const prod = {
          product: idProd,
          quantity: 1,
        };
        cartExists.products.push(prod);
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cartExists;
    }
  }
}
