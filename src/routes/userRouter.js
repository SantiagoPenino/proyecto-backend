import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verify.token.js";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", verifyToken, controller.profile);
router.post("/reset-password", verifyToken, controller.resetPassword);
router.put("/new-password", verifyToken, controller.updatePassword);

export default router;
