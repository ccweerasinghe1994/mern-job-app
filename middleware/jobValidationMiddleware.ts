import { body, param } from "express-validator";
import { Types } from "mongoose";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import jobModel from "../models/jobModel.js";
import { JOB_STATUS, JOB_TYPE, TUserRole } from "../types/types.js";
import { validationWithErrors } from "./commonValidation.js";
export const createJobValidation = validationWithErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobStatus")
    .notEmpty()
    .isIn(Object.values(JOB_STATUS))
    .withMessage("jobStatus must be one of pending, interview, or declined"),
  body("jobType")
    .notEmpty()
    .isIn(Object.values(JOB_TYPE))
    .withMessage("jobType must be one of full-time, part-time, or internship"),
  body("jobLocation")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("jobLocation is required")
    .isString()
    .withMessage("jobLocation must be a string"),
]);
export const updateJobValidation = validationWithErrors([
  body("company").optional().notEmpty().withMessage("company is required"),
  body("position").optional().notEmpty().withMessage("position is required"),
  body("jobStatus")
    .optional()
    .notEmpty()
    .isIn(Object.values(JOB_STATUS))
    .withMessage("jobStatus must be one of pending, interview, or declined"),
  body("jobType")
    .optional()
    .notEmpty()
    .isIn(Object.values(JOB_TYPE))
    .withMessage("jobType must be one of full-time, part-time, or internship"),
  body("jobLocation")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("jobLocation is required")
    .isString()
    .withMessage("jobLocation must be a string"),
]);

export const mongoDbIdValidationMiddleware = validationWithErrors([
  param("id").isMongoId().withMessage("Invalid MongoDB ID format"),
]);

export const mongoDbRecordExistsValidationMiddleware = validationWithErrors([
  param("id").custom(async (id: string, { req }) => {
    const validId = Types.ObjectId.isValid(id);
    if (!validId) {
      throw new BadRequestError("Invalid MongoDB ID format");
    }
    const job = await jobModel.findById(id);
    if (!job) {
      throw new BadRequestError("Job not found");
    }

    const isAdmin = req.user.role === TUserRole.ADMIN;
    const isOwner = req.user.userId === job._id.toString();

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("your are not allowed to access this route");
    }
  }),
]);
