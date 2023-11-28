import { Schema, model } from "mongoose";

export const productCollection = "product";

export const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, default: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: false },
});

export const productModel = model(productCollection, productSchema);
