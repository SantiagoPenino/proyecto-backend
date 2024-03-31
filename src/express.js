import express from "express";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import MainRouter from "./routes/index.js";
import config from "./config/config.js";
import { __dirname, mongoStoreOptions } from "./utils/utils.js";
import { logger } from "./utils/logger.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/ViewsRouter.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const PORT = config.PORT;
const mainRouter = new MainRouter();
const server = express();
const spects = swaggerJSDoc(info);

server.use(
  cors({
    credentials: true,
  })
);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(spects));
server.use(session(mongoStoreOptions));
server.use(passport.initialize());
server.use(passport.session());

server.engine("handlebars", handlebars.engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");
server.use(express.static(__dirname + "/src/public"));

server.use(express.json());
server.use(cookieParser(config.SECRET_COOKIES));
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.use("/loggerTest", (req, res) => {
  logger.error("Test endpoint error");
  res.send("Hello World!");
});

server.use("/api", mainRouter.getRouter());
server.use("/views", viewsRouter);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
