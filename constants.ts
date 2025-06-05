import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

export { MONGO_URI, NODE_ENV, PORT };
