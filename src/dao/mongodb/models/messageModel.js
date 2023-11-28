import { Schema, model } from "mongoose";

export const messageCollection = "messages";

export const messageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
});

export const messageModel = model(messageCollection, messageSchema);
