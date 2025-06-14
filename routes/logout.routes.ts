import { Router } from "express";
import { logoutHandler } from "../jobController/logout.controller.js";

const LogOutRouter = Router();

LogOutRouter.get("/", logoutHandler);

export { LogOutRouter };
