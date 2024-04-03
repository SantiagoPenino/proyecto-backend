import { Router } from "express";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import cartRouter from "./cartRouter.js";
import ticketRouter from "./ticketRouter.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/carts", cartRouter);
router.use("/tickets", ticketRouter);

export default router;
