import type { ErrorRequestHandler } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";

const errorHandlingMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  console.error(err);
  if (
    err instanceof NotFoundError ||
    err instanceof BadRequestError ||
    err instanceof UnauthenticatedError ||
    err instanceof UnauthorizedError
  ) {
    res.status(err.statusCode).json({ msg: err.message });
    return;
  }

  res.status(500).json({ msg: "something went wrong" });
};

export default errorHandlingMiddleware;
