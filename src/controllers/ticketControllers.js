import Controllers from "./classControllers.js";
import TicketServices from "../services/ticketServices.js";
import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const ticketServices = new TicketServices();
export default class TicketControllers extends Controllers {
  constructor() {
    super(ticketServices);
  }

  newTicket = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { cartId } = req.params;
      const ticket = await ticketServices.newTicket(_id, cartId);
      return !ticket
        ? httpResponse.NOT_FOUND(res, "Error generating ticket")
        : httpResponse.OK(res, ticket);
    } catch (error) {
      next(error);
    }
  };
}
