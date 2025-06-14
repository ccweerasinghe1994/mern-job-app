import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../jobController/user.controller.js";
const UserRouter = Router();

UserRouter.get("/current-user", getCurrentUser);
UserRouter.get("/admin/app-stats", getApplicationStats);
UserRouter.patch("/update-user", updateUser);

export { UserRouter };
