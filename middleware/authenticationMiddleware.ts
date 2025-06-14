import { RequestHandler } from "express";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { TJWTPayload } from "../types/types.js";
import { verifyJWTToken } from "../utils/tokenUtilities.js";

const authenticationMiddleware: RequestHandler = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const decoded = verifyJWTToken(token) as TJWTPayload;

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error: unknown) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export { authenticationMiddleware };
