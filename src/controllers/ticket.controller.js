import Controllers from "./class.controllers.js";
import TicketService from "../services/ticket.service.js";
import { HttpResponse, dictionary } from "../utils/httpResponse.js";

const HttpResponse = new HttpResponse();
const service = new TicketService();
export default class TicketController extends Controllers {
  constructor() {
    super(TicketService);
  }

  newTicket = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { cartId } = req.params;
      const ticket = await service.newTicket(_id, cartId);
      return !ticket
        ? HttpResponse.NOT_FOUND(res, "Error generating ticket")
        : HttpResponse.OK(res, ticket);
    } catch (error) {
      next(error);
    }
  };
}
