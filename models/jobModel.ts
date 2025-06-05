import { Schema, model } from "mongoose";
import { IJob } from "../types/types.js";

const jobSchema = new Schema<IJob>(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
);

export default model<IJob>("Job", jobSchema);
