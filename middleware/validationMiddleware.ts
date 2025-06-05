import { RequestHandler } from "express";
import { body, param, validationResult } from "express-validator";
import { Types } from "mongoose";
import { BadRequestError } from "../errors/customErrors.js";
import jobModel from "../models/jobModel.js";
import { JOB_STATUS, JOB_TYPE } from "../types/types.js";
const validationMiddleware: RequestHandler = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw new BadRequestError(errorMessages);
  }
  next();
};

const validationWithErrors = (
  validatedValues: RequestHandler[]
): RequestHandler[] => {
  return [...validatedValues, validationMiddleware];
};
validationWithErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
]);

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
  param("id").custom(async (id: string) => {
    const validId = Types.ObjectId.isValid(id);
    if (!validId) {
      throw new BadRequestError("Invalid MongoDB ID format");
    }
    const job = await jobModel.findById(id);
    if (!job) {
      throw new BadRequestError("Job not found");
    }
  }),
]);
