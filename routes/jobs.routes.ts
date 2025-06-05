import { Router } from "express";
import {
  createJobHandler,
  deleteJobHandler,
  getAllJobsHandler,
  getJobHandler,
  updateJobHandler,
} from "../jobController/job.controller.js";

const router = Router();

router.get("/", getAllJobsHandler);

router.post("/", createJobHandler);

router.get("/:id", getJobHandler);

router.patch("/:id", updateJobHandler);

router.delete("/:id", deleteJobHandler);

export default router;
