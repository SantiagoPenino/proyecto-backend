import { Router } from "express";
import ProductControllers from "../controllers/productControllers.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = Router();
const controllers = new ProductControllers();

router.get("/", controllers.getAll);
router.get("/:id", controllers.getById);
router.post("/", verifyUser, controllers.create);
router.put("/:id", verifyUser, controllers.update);
router.delete("/:id", verifyUser, controllers.delete);

export default router;
