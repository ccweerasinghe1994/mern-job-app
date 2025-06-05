import { Document } from "mongoose";

interface IJob {
  company: string;
  position: string;
  jobStatus: "pending" | "interview" | "declined";
  jobType: "full-time" | "part-time" | "internship";
  jobLocation: string;
}

interface IJobDocument extends IJob, Document {
  createdAt: Date;
  updatedAt: Date;
}

// "job": {
//     "company": "abc",
//     "position": "abc",
//     "jobStatus": "pending",
//     "jobType": "full-time",
//     "jobLocation": "my city",
//     "_id": "683efb9e81f518c02ca10199",
//     "createdAt": "2025-06-03T13:41:50.281Z",
//     "updatedAt": "2025-06-03T13:41:50.281Z",
//     "__v": 0
//   }