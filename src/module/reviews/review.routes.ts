
import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import {
  submitReview,
  listPendingSubmissions,
  listMyReviews,
  listAllReviews,
} from "./review.controller.js";

const reviewRoute = Router();

reviewRoute.get(
  "/pending",
  authenticate,
  authorize("MENTOR", "ADMIN"),
  listPendingSubmissions,
);

reviewRoute.patch(
  "/:submissionId",
  authenticate,
  authorize("MENTOR", "ADMIN"),
  submitReview,
);
reviewRoute.get(
  "/my",
  authenticate,
  authorize("STUDENT"),
  listMyReviews,
);
reviewRoute.get(
  "/all",
  authenticate,
  authorize("ADMIN"),
  listAllReviews,
);

export default reviewRoute;
