import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { verifyCookie } from "../middlewares/JwtCookies.js";

const router = Router();
const controller = new CartController();

router.get("/", verifyCookie, controller.getAll);
router.get("/:id", verifyCookie, controller.getById);
router.post("/", verifyCookie, controller.create);
router.delete("/:id", verifyCookie, controller.remove);
router.post("/:idCart/products/:idProduct",verifyCookie,controller.addProductToCart);
router.delete("/:idCart/products/:idProduct",verifyCookie,controller.removeProductToCart);
router.delete("/empty/:idCart", verifyCookie, controller.emptyCart);

export default router;
