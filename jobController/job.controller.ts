import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { HydratedDocument } from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { default as Job } from "../models/jobModel.js";
import { IJob } from "../types/types.js";

const getAllJobsHandler: RequestHandler = async (req, res) => {
  const jobsFromDB = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs: jobsFromDB });
};

const createJobHandler: RequestHandler = async (req, res) => {
  const { company, position }: { company: string; position: string } = req.body;

  if (!company || !position) {
    throw new BadRequestError(
      "Please provide company and position for the job"
    );
  }

  const newJob: HydratedDocument<IJob> = new Job({ company, position });

  const job = await newJob.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Job created successfully", job });
};

const getJobHandler: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new NotFoundError("Please provide job id");
  }

  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job });
};

const updateJobHandler: RequestHandler<
  { id: string },
  any,
  { company?: string; position?: string }
> = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!body?.company && !body?.position) {
    throw new BadRequestError(
      "Please provide at least one field to update (company or position)"
    );
  }
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    throw new NotFoundError("Job not found");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Job updated successfully", job: updatedJob });
};

const deleteJobHandler: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new NotFoundError("Please provide job id");
  }
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError("Job not found");
  }

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
