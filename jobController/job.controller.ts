import { RequestHandler } from "express";
import { HydratedDocument } from "mongoose";
import { nanoid } from "nanoid";
import Job from "../models/jobModel.js";
import { IJob, IJobDocument } from "../types/types.js";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

const getAllJobsHandler: RequestHandler = async (req, res) => {
  res.status(200).json({ jobs });
};

const createJobHandler: RequestHandler = async (req, res) => {
  const { company, position }: { company: string; position: string } = req.body;

  if (!company || !position) {
    res.status(400).json({ msg: "please provide company and position" });
    return;
  }

  const newJob: HydratedDocument<IJob> = new Job({ company, position });

  const job = await newJob.save();
  
  res.status(201).json({ msg: "Job created successfully", job });
};

const getJobHandler: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ msg: "Please provide job id" });
    return;
  }

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: "Job not found" });
    return;
  }
  res.status(200).json({ job });
};

const updateJobHandler: RequestHandler<
  { id: string },
  any,
  { company?: string; position?: string }
> = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!body?.company && !body?.position) {
    res.status(400).json({ msg: "Please provide company or position" });
    return;
  }

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: "Job not found" });
    return;
  }
  if (body.company) {
    job.company = body.company;
  }
  if (body.position) {
    job.position = body.position;
  }
  res.status(200).json({ message: "Job updated successfully", job });
};

const deleteJobHandler: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  const jobIndex = jobs.findIndex((job) => job.id === id);
  if (jobIndex === -1) {
    res.status(404).json({ msg: "Job not found" });
    return;
  }

  jobs.splice(jobIndex, 1);
  res.status(204).json({
    msg: "Job deleted successfully",
  });
};

const notFoundHandler: RequestHandler = async (req, res) => {
  res.status(404).send("Page not found");
};

export {
  createJobHandler,
  deleteJobHandler,
  getAllJobsHandler,
  getJobHandler,
  notFoundHandler,
  updateJobHandler,
};
