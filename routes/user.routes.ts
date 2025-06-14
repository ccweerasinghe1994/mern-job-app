import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../jobController/user.controller.js";
import { authorizedRolesMiddleware } from "../middleware/authenticationMiddleware.js";
import { userUpdateValidationMiddleware } from "../middleware/userValidationMiddleware.js";
import { TUserRole } from "../types/types.js";
const UserRouter = Router();

UserRouter.get("/current-user", getCurrentUser);
UserRouter.get(
  "/admin/app-stats",
  authorizedRolesMiddleware(TUserRole.ADMIN),
  getApplicationStats
);
UserRouter.patch("/update-user", userUpdateValidationMiddleware, updateUser);

export { UserRouter };
