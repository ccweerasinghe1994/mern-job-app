import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../models/user.model.js";
import { TUpdateUserRequestBody, TUserDocument } from "../types/types.js";

const getCurrentUser: RequestHandler<{}, { user: TUserDocument }> = async (
  req,
  res
) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  const response = user?.toObject()! as TUserDocument;

  res.status(StatusCodes.OK).json({ user: response });
};

const getApplicationStats: RequestHandler = async (req, res) => {
  const totalJobs = await UserModel.countDocuments();
  const totalUsers = await UserModel.countDocuments();
  res
    .status(StatusCodes.OK)
    .json({ msg: "application stats", totalJobs, totalUsers });
};

const updateUser: RequestHandler<{}, {}, TUpdateUserRequestBody> = async (
  req,
  res
) => {
  const { name, email, lastName, location } = req.body;
  const { userId } = req.user;
  const user: TUpdateUserRequestBody = {
    name,
    email,
    lastName,
    location,
  };
  await UserModel.findByIdAndUpdate(userId, user);
  res.status(StatusCodes.OK).json({ msg: "User updated successfully" });
};

export { getApplicationStats, getCurrentUser, updateUser };
