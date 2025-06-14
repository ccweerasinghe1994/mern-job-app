import { Response } from "express";
import { NODE_ENV } from "../constants.js";

function setCookie(
  res: Response,
  name: string,
  value: string,
  expiredInMs: Date,
  httpOnly: boolean = true
) {
  res.cookie(name, value, {
    expires: expiredInMs,
    secure: NODE_ENV === "production" ? true : false,
    httpOnly,
  });
}

export { setCookie };
