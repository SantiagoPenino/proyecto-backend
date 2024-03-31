import Controllers from "./class.controllers.js";
import TicketService from "../services/ticketService.js";
import { HttpResponse } from "../utils/httpResponse.js";

const httpResponse = new HttpResponse();
const service = new TicketService();
export default class TicketController extends Controllers {
  constructor() {
    super(service);
  }

  newTicket = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { cartId } = req.params;
      const ticket = await service.newTicket(_id, cartId);
      return !ticket
        ? httpResponse.NOT_FOUND(res, "Error generating ticket")
        : httpResponse.OK(res, ticket);
    } catch (error) {
      next(error);
    }
  };
}
