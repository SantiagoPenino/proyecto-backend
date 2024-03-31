import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = Router();
const controller = new ProductController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", verifyUser, controller.create);
router.put("/:id", verifyUser, controller.update);
router.delete("/:id", verifyUser, controller.remove);

export default router;
