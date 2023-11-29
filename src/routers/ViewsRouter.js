import { Router } from "express";
import { ProductManager } from "../dao/FileSystem/ProductManager.js";
import { socketServer } from "../express.js";

const router = Router();
const productManager = new ProductManager("../src/data/products.json");

router.get("/index", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    const product = req.body;
    await productManager.addProduct(product);
    socketServer.emit("newProduct", product);
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/chat", (req, res) => {
  res.render("chat");
});
export default router;
