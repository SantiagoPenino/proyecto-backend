import { Router } from "express";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import cartRouter from "./cartRouter.js";
import viewRouter from "./ViewRouter.js";

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use("/api/products", productRouter);
    this.router.use("/api/users", userRouter);
    this.router.use("/api/carts", cartRouter);
    this.router.use("/", viewRouter);
  }

  getRouter() {
    return this.router;
  }
}
