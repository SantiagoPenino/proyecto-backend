import { Schema, model } from "mongoose";

export const productsCatalog = "products";

export const ProductSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
});

export const ProductModel = model(productsCatalog, ProductSchema);
