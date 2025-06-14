import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";

const validationMiddleware: RequestHandler = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw new BadRequestError(errorMessages);
  }
  next();
};

const validationWithErrors = (
  validatedValues: RequestHandler[]
): RequestHandler[] => {
  return [...validatedValues, validationMiddleware];
};

export { validationWithErrors };
