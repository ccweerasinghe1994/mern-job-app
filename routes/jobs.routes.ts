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

const router = Router();

router.get("/", getAllJobsHandler);

router.post("/", createJobValidation, createJobHandler);

router.get("/:id", mongoDbRecordExistsValidationMiddleware, getJobHandler);

router.patch(
  "/:id",
  mongoDbRecordExistsValidationMiddleware,
  updateJobValidation,
  updateJobHandler
);

router.delete(
  "/:id",
  mongoDbRecordExistsValidationMiddleware,
  deleteJobHandler
);

export default router;
