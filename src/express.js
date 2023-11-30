import express from "express";
import { initMongoDB } from "./dao/mongodb/connection.js";
import viewsRouter from "./routers/ViewsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import productRouter from "./routes/productRouter.js";
import { Server } from "socket.io";
import { __dirname } from "../utils.js";
import handlebars from "express-handlebars";
import MessageManager from "./dao/mongodb/ChatDao.js";
const messageManager = new MessageManager();

const persistence = "MONGO";
const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/src/public"));
server.use("/api/products", productRouter);
server.use("/api/carts", cartRouter);
server.engine("handlebars", handlebars.engine());
server.set("views", __dirname + "/src/views");
server.set("view engine", "handlebars");
server.use("/", viewsRouter);
server.use("/realtimeproducts", viewsRouter);
server.use("/chat", viewsRouter);
server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

if (persistence === "MONGO") await initMongoDB();

const httpServer = server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
export const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log(`🟢 Client connected ${socket.id}`);
  socketServer.emit("messages", await messageManager.getAll());
  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected ${socket.id}`);
  });
  socket.on("newUser", (user) => console.log(`⏩ ${user} has connected`));
  socket.on("chat:message", async (message) => {
    await messageManager.create(message);
    socketServer.emit("messages", await messageManager.getAll());
  });
  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUser", user);
  });
  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
