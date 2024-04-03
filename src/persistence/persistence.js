import ProductDao from "./daos/productDao.js";
import UserDao from "./daos/userDao.js";
import CartDao from "./daos/cartDao.js";
import TicketDao from "./daos/ticketDao.js";
import { initMongoDB } from "../config/mongoConnection.js";
import "dotenv/config";

await initMongoDB();

const userDao = new UserDao();
const productDao = new ProductDao();
const cartDao = new CartDao();
const ticketDao = new TicketDao();

export default { userDao, productDao, cartDao, ticketDao };
