
import { Router } from "express";
import { submissionRateLimit } from "../../middleware/submission-rate-limit.middleware.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import {
  submitProject,
  listMySubmissions,
} from "./submission.controller.js";

const submissionRoute = Router();

submissionRoute.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  submissionRateLimit,
  submitProject,
);
submissionRoute.get(
  "/my",
  authenticate,
  authorize("STUDENT"),
  listMySubmissions,
);

export default submissionRoute;
