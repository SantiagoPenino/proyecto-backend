import { Router } from "express";
import * as controller from "../controllers/products.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/dto", controller.createDto);
router.get("/dto/:id", controller.getByIdDto);

export default router;
