import { connect } from "mongoose";
import config from "./config.js";

const connectionString = `${config.MONGO_URL}${config.DATABASE_NAME}`;

export const initMongoDB = async () => {
  try {
    await connect(connectionString);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};
