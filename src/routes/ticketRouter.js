import { Router } from "express";
import * as controller from "../controllers/ticket.controller.js";
import { verifyCookie } from "../middlewares/JwtCookies.js";

const router = Router();

router.post("/cart/:idCart", verifyCookie, controller.newTicket);

export default router;
