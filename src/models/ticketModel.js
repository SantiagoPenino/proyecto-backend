import { Schema, model } from "mongoose";

export const ticketCollection = "tickets";

export const ticketSchema = new Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  products: { type: Array, required: true },
});

export const TicketModel = model(ticketCollection, ticketSchema);
