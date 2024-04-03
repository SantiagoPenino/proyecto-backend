import MongoDao from "./mongoDao.js";
import { TicketModel } from "../models/ticketModel.js";

export default class TicketDao extends MongoDao {
  constructor() {
    super(TicketModel);
  }
}
