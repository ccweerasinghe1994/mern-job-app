import dotenv from "dotenv";
import ms from "ms";
dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as ms.StringValue;
export { JWT_EXPIRES_IN, JWT_SECRET, MONGO_URI, NODE_ENV, PORT };
