import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:idCart/products/:idProduct", controller.addProductToCart);
router.delete("/:idCart/products/:idProduct", controller.removeProductFromCart);
router.delete("/empty/:idCart", controller.emptyCart);

export default router;
