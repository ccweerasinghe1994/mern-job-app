import { RequestHandler } from "express";
import { HydratedDocument } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { TUser, TUserRole } from "../types/types.js";
import { hashPassword } from "../utils/passwordUtils.js";
const registerHandler: RequestHandler<{}, {}, TUser> = async (req, res) => {
  const usersCount = await UserModel.countDocuments(); // Check if this is the first user

  req.body.role = usersCount === 0 ? TUserRole.ADMIN : TUserRole.USER; // Automatically set the first user as admin

  req.body.password = await hashPassword(req.body.password);

  const user: HydratedDocument<TUser> = new UserModel(req.body);
  await user.save();
  res.status(201).json({
    message: "User registered successfully",
  });
};

export { registerHandler };
