import express from "express";
import { initMongoDB, MONGO_URL } from "./dao/mongodb/connection.js";
import viewsRouter from "./routes/ViewsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import { Server } from "socket.io";
import { __dirname } from "../utils.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

const persistence = "MONGO";
const server = express();
const PORT = 8080;
const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    ttl: 120,
  }),
  secret: "coderhouse",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
};
server.engine("handlebars", handlebars.engine());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/src/public"));
server.set("views", __dirname + "/src/views");
server.set("view engine", "handlebars");
server.use("/api/products", productRouter);
server.use("/api/carts", cartRouter);
server.use("/users", userRouter);
server.use("/", viewsRouter);
server.use(session(mongoStoreOptions));
server.use(cookieParser());
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
});
