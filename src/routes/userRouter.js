import { Router } from "express";
import UserControllers from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verify.token.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router();
const controllers = new UserControllers();

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get("/profile-cookie", checkAuth, controllers.profile);
router.get("/all", verifyToken, controllers.getAll);
router.delete("/delete", verifyToken, controllers.deleteInactive);
router.post("/reset-password", verifyToken, controllers.resetPassword);
router.put("/new-password", verifyToken, controllers.updatePassword);

export default router;
