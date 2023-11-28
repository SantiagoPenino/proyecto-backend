import { Schema, model } from "mongoose";

export const cartCollection = "carts";

export const cartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const cartModel = model(cartCollection, cartSchema);
