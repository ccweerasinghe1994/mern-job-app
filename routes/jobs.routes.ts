import { Router } from "express";
import {
  createJobHandler,
  deleteJobHandler,
  getAllJobsHandler,
  getJobHandler,
  updateJobHandler,
} from "../jobController/job.controller.js";
import {
  createJobValidation,
  mongoDbRecordExistsValidationMiddleware,
  updateJobValidation,
} from "../middleware/jobValidationMiddleware.js";

const JobRouter = Router();

JobRouter.get("/", getAllJobsHandler);

JobRouter.post("/", createJobValidation, createJobHandler);

JobRouter.get("/:id", mongoDbRecordExistsValidationMiddleware, getJobHandler);

JobRouter.patch(
  "/:id",
  mongoDbRecordExistsValidationMiddleware,
  updateJobValidation,
  updateJobHandler
);

JobRouter.delete(
  "/:id",
  mongoDbRecordExistsValidationMiddleware,
  deleteJobHandler
);

export { JobRouter };
