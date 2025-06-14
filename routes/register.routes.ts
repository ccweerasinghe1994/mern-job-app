import { Router } from "express";
import { registerHandler } from "../jobController/register.controller.js";
import {
  userAlreadyRegisteredMiddleware,
  userRegisterValidationMiddleware,
} from "../middleware/userValidationMiddleware.js";

export const RegisterRouter = Router();

RegisterRouter.post(
  "/",
  userRegisterValidationMiddleware,
  userAlreadyRegisteredMiddleware,
  registerHandler
);
