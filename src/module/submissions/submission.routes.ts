
import { Router } from "express";
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
  submitProject,
);

submissionRoute.get(
  "/my",
  authenticate,
  authorize("STUDENT"),
  listMySubmissions,
);

export default submissionRoute;
