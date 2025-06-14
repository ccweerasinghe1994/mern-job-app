import express from "express";
import "express-async-errors";
import { connect } from "mongoose";
import morgan from "morgan";
// constants
import { MONGO_URI, NODE_ENV, PORT } from "./constants.js";
// controllers
import { notFoundHandler } from "./jobController/job.controller.js";
// routes
import cookieParser from "cookie-parser";
import { authenticationMiddleware } from "./middleware/authenticationMiddleware.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import {
  JobRouter,
  LogOutRouter,
  LoginRouter,
  RegisterRouter,
  UserRouter,
} from "./routes/index.js";

const app = express();
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/jobs", authenticationMiddleware, JobRouter);
app.use("/api/v1/register", RegisterRouter);
app.use("/api/v1/login", LoginRouter);
app.use("/api/v1/logout", LogOutRouter);
app.use("/api/v1/users", authenticationMiddleware, UserRouter);

app.get("/{*splat}", notFoundHandler);

app.use(errorHandlingMiddleware);

try {
  await connect(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
