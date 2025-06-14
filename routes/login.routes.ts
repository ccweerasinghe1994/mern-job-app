import { Router } from "express";
import { loginHandler } from "../jobController/login.controller.js";
import {
  checkEmailPasswordValidationMiddleware,
  userLoginValidationMiddleware,
} from "../middleware/userValidationMiddleware.js";

const LoginRouter = Router();

LoginRouter.post(
  "/",
  userLoginValidationMiddleware,
  checkEmailPasswordValidationMiddleware,
  loginHandler
);

export { LoginRouter };
