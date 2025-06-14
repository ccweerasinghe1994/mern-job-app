import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../models/user.model.js";
import { TUserDocument } from "../types/types.js";

const getCurrentUser: RequestHandler<{}, { user: TUserDocument }> = async (
  req,
  res
) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  const response = user?.toObject()! as TUserDocument;

  res.status(StatusCodes.OK).json({ user: response });
};

const getApplicationStats: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "application stats" });
};

const updateUser: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update user" });
};

export { getApplicationStats, getCurrentUser, updateUser };
