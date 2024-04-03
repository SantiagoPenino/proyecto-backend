import { Router } from "express";
import CartControllers from "../controllers/cartControllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router();
const controllers = new CartControllers();

router.get("/", checkAuth, controllers.getAll);
router.get("/:id", checkAuth, controllers.getById);
router.post("/", checkAuth, controllers.create);
router.delete("/:id", checkAuth, controllers.delete);
router.post(
  "/:idCart/products/:idProduct",
  checkAuth,
  controllers.addProductToCart
);
router.delete(
  "/:idCart/products/:idProduct",
  checkAuth,
  controllers.removeProductToCart
);
router.delete("/empty/:idCart", checkAuth, controllers.clearCart);

export default router;
