import type { ErrorRequestHandler } from "express";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

const errorHandlingMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof NotFoundError || BadRequestError) {
    res.status(err.statusCode).json({ msg: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ msg: "something went wrong" });
};

export default errorHandlingMiddleware;
