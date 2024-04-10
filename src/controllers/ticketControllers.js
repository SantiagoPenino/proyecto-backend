import Controllers from "./classControllers.js";
import TicketServices from "../services/ticketServices.js";
import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const ticketServices = new TicketServices();
export default class TicketControllers extends Controllers {
  constructor() {
    super(ticketServices);
  }

  generateTicket = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { idCart } = req.params;
      const data = await ticketServices.newTicket(_id, idCart);
      return !data
        ? httpResponse.NOT_FOUND(res, "Error generating ticket")
        : httpResponse.OK(res, data);
    } catch (error) {
      next(error.message);
    }
  };
}
