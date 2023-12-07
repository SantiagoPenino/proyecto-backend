import { Router } from "express";
import { ProductManager } from "../dao/FileSystem/ProductManager.js";
import ProductDao from "../dao/mongodb/ProductDao.js";
import { socketServer } from "../express.js";

const router = Router();
const productManager = new ProductManager("../src/data/products.json");
const productDao = new ProductDao();

router.get("/index", async (req, res) => {
  try {
    const products = await productDao.getAll();
    res.render("home", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productDao.getAll();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    const product = req.body;
    await productDao.create(product);
    socketServer.emit("newProduct", product);
    const products = await productDao.getAll();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
