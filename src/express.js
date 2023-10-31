import express from "express";
import productRouter from "./routes/productRrouter.js";

const server = express();
const PORT = 8080;

server.use(express.json());

server.use('/api/products', productRouter);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
