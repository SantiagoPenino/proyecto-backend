import {Router} from 'express';
import * as controller from '../controllers/ticket.controller.js';
import { verifyToken } from '../middlewares/verify.token.js';

const router = Router();

router.post('/cart/:idCart', verifyToken, controller.newTicket);

export default router;