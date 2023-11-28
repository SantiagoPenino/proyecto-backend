import { connect } from "mongoose";

const MONGO_URL =
  "mongodb+srv://admin:admin@cluster0.jwey7jj.mongodb.net/ecommerce?retryWrites=true&w=majority";
try {
  await connect(MONGO_URL);
  console.log("Connected to MongoDB");
} catch {
  console.log("Error connecting to MongoDB");
}
