import {Router} from "express";
import * as controller from "../controllers/products.controller";

const router = Router();

router.post('/', controller.createMockProduct);

export default router;

