import Services from "./classServices.js";
import persistence from "../persistence/persistence.js";
import { v4 as uuidv4 } from "uuid";

const { ticketDao, userDao, productDao, cartDao } = persistence;

export default class TicketServices extends Services {
  constructor() {
    super(ticketDao);
  }

  newTicket = async (userId, cartId) => {
    try {
      const user = await userDao.getById(userId);
      const cart = await cartDao.getById(cartId);

      if (!user || !cart) {
        return false;
      }
      let AccumulatedAmount = 0;
      for (const p of cart.products) {
        const productId = p.product._id.toString();
        const productFromDB = await productDao.getById(productId);
        if (p.quantity <= productFromDB.stock) {
          const amount = p.quantity * productFromDB.price;
          AccumulatedAmount += amount;
        }
      }

      const ticket = await ticketDao.newTicket({
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
