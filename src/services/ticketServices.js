import Services from "./classServices.js";
import persistence from "../persistence/persistence.js";
import { v4 as uuidv4 } from "uuid";

const { ticketDao, userDao, productDao, cartDao } = persistence;

export default class TicketServices extends Services {
  constructor() {
    super(ticketDao);
  }

  generateTicket = async (idUser, idCart) => {
    try {
      const user = await userDao.getById(idUser);
      const cart = await cartDao.getById(idCart);

      if (!user || !cart) {
        return false;
      }
      let AccumulatedAmount = 0;
      for (const p of cart.products) {
        const idProduct = p.product._id.toString();
        const productFromDB = await productDao.getById(idProduct);
        if (p.quantity <= productFromDB.stock) {
          const amount = p.quantity * productFromDB.price;
          AccumulatedAmount += amount;
        }
      }

      const ticket = await ticketDao.generateTicket({
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: AccumulatedAmount,
        purchaser: user.email,
      });

      cart.products = [];
      cart.save();
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  };
}
