import { Schema, model } from "mongoose";

export const TicketSchema = new Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

export const TicketModel = model("tickets", TicketSchema);
