import { Schema, model } from "mongoose";

export const cartCollection = "carts";

export const cartSchema = new Schema({
  id: { type: String, required: true },
  products: [{ type: Array, required: true }],
});

export const cartModel = model(cartCollection, cartSchema);
