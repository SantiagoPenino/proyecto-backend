import { Router } from "express";
import TicketControllers from "../controllers/ticketControllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router();
const controllers = new TicketControllers();

router.post("/cart/:idCart", checkAuth, controllers.newTicket);

export default router;
