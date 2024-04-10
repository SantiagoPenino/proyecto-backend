import { Router } from "express";
import ViewsControllers from "../controllers/viewControllers.js";

const router = Router();
const controllers = new ViewsControllers();

router.get("/", controllers.home);
router.get("/login", controllers.login);
router.get("/register", controllers.register);
router.get("/profile", controllers.profile);
router.get("/register-error", controllers.registerError);
router.get("/login-error", controllers.loginError);

export default router;
