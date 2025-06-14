import { JwtPayload } from "jsonwebtoken";
import { Document, Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId?: Types.ObjectId;
        role?: TUserRole;
      };
    }
  }
}

export enum JOB_STATUS {
  PENDING = "pending",
  INTERVIEW = "interview",
  DECLINED = "declined",
}

export enum JOB_TYPE {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  INTERNSHIP = "internship",
}

export enum JOB_SORT_TYPE {
  NEWEST_FIRST = "newest",
  OLDEST_FIRST = "oldest",
  ASCENDING = "a-z",
  DESCENDING = "z-a",
}

export interface IJob {
  company: string;
  position: string;
  jobStatus: JOB_STATUS;
  jobType: JOB_TYPE;
  jobLocation: string;
  createdBy: Types.ObjectId;
}

export interface IJobDocument extends IJob, Document {
  createdAt: Date;
  updatedAt: Date;
}

export enum TUserRole {
  ADMIN = "admin",
  USER = "user",
}

export type TUser = {
  name: string;
  email: string;
  password: string;
  lastName?: string;
  location?: string;
  role: TUserRole;
};

export type TUserWithId = TUser & { userId: string };

export type TJWTPayload = JwtPayload & {
  userId: Types.ObjectId;
  role: TUserRole;
};
