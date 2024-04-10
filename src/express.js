import config from "./config/config.js";
import express from "express";
import MainRouter from "./routes/index.js";
import { mongoStoreOptions } from "./utils/utils.js";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import { info } from "./docs/info.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { dirname } from "path";
import { fileURLToPath } from "url";

import viewRouter from "./routes/ViewRouter.js";
import cors from "cors";

const PORT = config.PORT;
const server = express();
const specs = swaggerJSDoc(info);
const mainRouter = new MainRouter();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
console.log(__dirname);

server.use(
  cors({
    credentials: true,
  })
);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
server.use(cookieParser(config.SECRET_COOKIES));
server.use(session(mongoStoreOptions));
server.use(passport.initialize());
server.use(passport.session());

server.engine("handlebars", handlebars.engine());
server.set("view engine", "handlebars");
server.set("views", `${__dirname}/views`);
server.use(express.static(`${__dirname}/public`));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(morgan("dev"));

server.use("/", viewRouter);
server.use("/", mainRouter.getRouter());

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
