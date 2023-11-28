import { connect } from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/coder47345";

try {
  await connect(MONGO_URL);
  console.log("Connected to MongoDB");
} catch {
  console.log("Error connecting to MongoDB");
}
