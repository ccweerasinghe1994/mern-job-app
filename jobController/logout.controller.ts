import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const logoutHandler: RequestHandler = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({
    msg: "logout successful",
  });
};

export { logoutHandler };
