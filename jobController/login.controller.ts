import { RequestHandler } from "express";
import { HydratedDocument } from "mongoose";
import { BadRequestError } from "../errors/customErrors.js";
import { UserModel } from "../models/user.model.js";
import { TUser } from "../types/types.js";
import { setCookie } from "../utils/cookieUtilities.js";
import { comparePassword } from "../utils/passwordUtils.js";
import { createJwtToken } from "../utils/tokenUtilities.js";

const loginHandler: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials
  const user = (await UserModel.findOne({ email })
    .select("password _id role")
    .lean()
    .exec()) as HydratedDocument<TUser>;

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid email or password");
  }

  const jwtToken = createJwtToken({
    userId: user._id,
    role: user.role,
  });
  const oneDay = new Date(Date.now() + 1000 * 60 * 60 * 24);
  setCookie(res, "token", jwtToken, oneDay);

  res.status(200).json({
    message: "Login successful",
  });
};

export { loginHandler };
