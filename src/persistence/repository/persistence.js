import ProductMongoDao from "../dao/mongodb/product/product.dao.js";
import UserMongoDao from "../dao/mongodb/user/user.dao.js";
import CartMongoDao from "../dao/mongodb/cart/cart.dao.js";
import TicketMongoDao from "../dao/mongodb/ticket/ticket.dao.js";
import { initMongoDB } from "../../config/mongo.config.js";
import "dotenv/config";

const persistence = process.argv[2];
let productDao, userDao, cartDao, ticketDao;

if (persistence === "MONGO") {
  await initMongoDB();
  userDao = new UserMongoDao();
  productDao = new ProductMongoDao();
  cartDao = new CartMongoDao();
  ticketDao = new TicketMongoDao();
}

export default { userDao, productDao, cartDao, ticketDao };
