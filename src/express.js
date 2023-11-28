import "./db/connection.js";
import express from "express";
import productRouter from "./routers/productRrouter.js";
import cartRouter from "./routers/CartRouter.js";
import viewRouter from "./routers/ViewsRouter.js";
import { Server } from "socket.io";
import { __dirname } from "../utils.js";
import handlebars from "express-handlebars";

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.static(__dirname + "/src/public"));
server.use("/api/products", productRouter);
server.use("/api/carts", cartRouter);
server.engine("handlebars", handlebars.engine());
server.set("views", __dirname + "/src/views");
server.set("view engine", "handlebars");
server.use("/", viewRouter);
server.use("/chat", viewRouter);

const httpServer = server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
export const ioServer = new Server(httpServer);

ioServer.on("connection", (socket) => {
  console.log(`Client connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Client disconnected ${socket.id}`);
  });
});
