import { Document } from "mongoose";

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
}

export interface IJobDocument extends IJob, Document {
  createdAt: Date;
  updatedAt: Date;
}
