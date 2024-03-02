import { Schema, model } from "mongoose";

const userCatalog = "users";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = model(userCatalog, UserSchema);
