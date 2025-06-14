import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { HydratedDocument } from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { default as Job } from "../models/jobModel.js";
import { IJob } from "../types/types.js";

const getAllJobsHandler: RequestHandler = async (req, res) => {
  const jobsFromDB = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs: jobsFromDB });
};

const createJobHandler: RequestHandler = async (req, res) => {
  const { company, position }: { company: string; position: string } = req.body;

  if (!company || !position) {
    throw new BadRequestError(
      "Please provide company and position for the job"
    );
  }
  const createdBy = req.user.userId;
  const newJob: HydratedDocument<IJob> = new Job({
    company,
    position,
    createdBy,
  });

  const job = await newJob.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Job created successfully", job });
};

const getJobHandler: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

const updateJobHandler: RequestHandler<
  { id: string },
  any,
  { company?: string; position?: string }
> = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Job updated successfully", job: updatedJob });
};

const deleteJobHandler: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  await Job.findByIdAndDelete(id);
  res.status(StatusCodes.NO_CONTENT).json({
    msg: "Job deleted successfully",
  });
};

const notFoundHandler: RequestHandler = async (req, res) => {
  throw new NotFoundError("Page not found");
};

export {
  createJobHandler,
  deleteJobHandler,
  getAllJobsHandler,
  getJobHandler,
  notFoundHandler,
  updateJobHandler,
};
