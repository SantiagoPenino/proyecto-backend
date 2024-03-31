import { Schema, model } from "mongoose";

const userCatalog = "users";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  isGithub: {
    type: Boolean,
    default: false,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  lastConnection: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = model(userCatalog, UserSchema);
