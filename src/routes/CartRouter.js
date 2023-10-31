import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
import { CartManager } from "../CartManager.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.addCart();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.getCartById(Number(id));
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    } else {
      res.status(200).json(cart);
      return cart;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.getCartById(Number(cid));
    const product = await productManager.getProductById(Number(pid));
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    }
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    }
    await cartManager.addProductToCart(cid, pid);
    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
