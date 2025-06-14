import { RequestHandler } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { UserModel } from "../models/user.model.js";
import { validationWithErrors } from "./commonValidation.js";

const userRegisterValidationMiddleware: RequestHandler[] = validationWithErrors(
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]
);

// let's write a middleware to check if the user is already registered

const userAlreadyRegisteredMiddleware: RequestHandler[] = validationWithErrors([
  body("email").custom(async (email: string) => {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new BadRequestError("User already registered");
    }
  }),
]);

const userLoginValidationMiddleware: RequestHandler[] = validationWithErrors([
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
]);

const checkEmailPasswordValidationMiddleware: RequestHandler[] =
  validationWithErrors([
    body("email").custom(async (email: string) => {
      const user = await UserModel.find({ email });
      if (!user || user.length === 0) {
        throw new BadRequestError("Invalid email or password");
      }
    }),
  ]);

export {
  checkEmailPasswordValidationMiddleware,
  userAlreadyRegisteredMiddleware,
  userLoginValidationMiddleware,
  userRegisterValidationMiddleware,
};
