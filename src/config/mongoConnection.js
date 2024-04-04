import { connect } from "mongoose";
import config from "./config.js";

const connectionString = config.MONGO_URL;

export const initMongoDB = async () => {
  try {
    await connect(connectionString);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
};
