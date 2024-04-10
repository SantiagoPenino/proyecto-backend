import { Schema, model } from "mongoose";

export const cartCollection = "carts";

export const CartSchema = new Schema({
  owner: {
    type: String,
  },
  products: [
    {
      _id: false,
      quantity: { type: Number, default: 0 },
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],
});

export const CartModel = model(cartCollection, CartSchema);
