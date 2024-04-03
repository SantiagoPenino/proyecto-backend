import path from "path";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/index.js";
import viewRouter from "./routes/ViewRouter.js";
import config from "./config/config.js";
import { __dirname, mongoStoreOptions } from "./utils/utils.js";
import handlebars from "express-handlebars";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import {info} from './docs/info.js'

const PORT = config.PORT;
const server = express();
const specs = swaggerJSDoc(info);

server.use(
  cors({
    credentials: true,
  })
);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
server.use(session(mongoStoreOptions));
server.use(passport.initialize());
server.use(passport.session());

server.engine("handlebars", handlebars.engine());
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "views"));
server.use(express.static(path.join(__dirname, "public")));

server.use(express.json());
server.use(cookieParser(config.SECRET_COOKIES));
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.use("/", viewRouter);
server.use("/api", apiRouter);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
