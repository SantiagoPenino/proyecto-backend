import { Router } from "express";
import * as controller from "../controllers/views.controller.js";

const router = Router();

router.get('/',controller.login);
router.get('/register',controller.register);
router.get('/profile',controller.profile);
router.get('/register-error',controller.registerError);
router.get('/login-error',controller.loginError);

export default router;
