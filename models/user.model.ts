import { model, Schema } from "mongoose";
import { TUser, TUserRole } from "../types/types.js";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: {
      type: String,
      select: false,
    },
    lastName: {
      type: String,
      default: "lastName",
    },
    location: {
      type: String,
      default: "location",
    },
    role: {
      type: String,
      enum: Object.values(TUserRole),
      default: TUserRole.USER,
    },
  },
  { timestamps: true }
);

const UserModel = model<TUser>("User", userSchema);

export { UserModel };
