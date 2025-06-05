import { StatusCodes } from "http-status-codes";

class NotFoundError extends Error {
  statusCode: number;
  name: string;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}
class BadRequestError extends Error {
  statusCode: number;
  constructor(message: string | string[]) {
    if (Array.isArray(message)) {
      message = message.join(", ");
    }
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
class UnauthenticatedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
export {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
