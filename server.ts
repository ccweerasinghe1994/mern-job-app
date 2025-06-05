import express, { NextFunction, Request, Response } from "express";
import { connect } from "mongoose";
import morgan from "morgan";

// constants
import { MONGO_URI, NODE_ENV, PORT } from "./constants.js";
// controllers
import { notFoundHandler } from "./jobController/job.controller.js";
// routes
import JobRouter from "./routes/jobs.routes.js";

const app = express();
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/jobs", JobRouter);

app.get("/{*splat}", notFoundHandler);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

try {
  await connect(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
