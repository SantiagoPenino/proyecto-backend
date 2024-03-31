import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import { verifyCookie } from "../middlewares/JwtCookies.js";

const router = Router();
const controller = new TicketController();

router.post("/cart/:idCart", verifyCookie, controller.newTicket);

export default router;
