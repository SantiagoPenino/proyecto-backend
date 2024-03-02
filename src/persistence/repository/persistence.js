import ProductMongoDao from "../dao/mongodb/product/product.dao.js";
import UserMongoDao from "../dao/mongodb/user/user.dao.js";
import CartMongoDao from "../dao/mongodb/cart/cart.dao.js";
import TicketMongoDao from "../dao/mongodb/ticket/ticket.dao.js";
import ProductFsDao from "../dao/filesystem/product.dao";
import UserFsDao from "../dao/filesystem/user.dao";
import CartFsDao from "../dao/filesystem/cart.dao";
import { initMongoDB } from "../config/mongo.config.js";
import "dotenv/config";

const persistence = process.argv[2];

let userDao = new UserFsDao("./src/persistence/dao/filesystem/users.json");
let productDao = new ProductFsDao(
  "./src/persistence/dao/filesystem/products.json"
);
let cartDao = new CartFsDao("./src/persistence/dao/filesystem/carts.json");
let ticketDao = new TicketMongoDao(
  "./src/persistence/daos/filesystem/tickets.json"
);

if (persistence === "MONGO") {
  await initMongoDB();
  userDao = new UserMongoDao();
  productDao = new ProductMongoDao();
  cartDao = new CartMongoDao();
  ticketDao = new TicketMongoDao();
}

export default { userDao, productDao, cartDao, ticketDao };
