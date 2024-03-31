import { Schema, model } from "mongoose";

export const TicketSchema = new Schema({
  code: { type: String, required: true },
  purchaseDatetime: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

export const TicketModel = model("tickets", TicketSchema);
