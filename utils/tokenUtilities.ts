import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../constants.js";
import { TJWTPayload } from "../types/types.js";

function createJwtToken(payload: TJWTPayload): string {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
}

function verifyJWTToken(token: string) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}

export { createJwtToken, verifyJWTToken };
