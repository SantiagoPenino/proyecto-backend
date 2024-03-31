import { Schema, model } from "mongoose";

export const productsCatalog = "products";

export const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productStock: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productOwner: {
    type: String,
    default: "admin",
  },
});

export const ProductModel = model(productsCatalog, ProductSchema);
