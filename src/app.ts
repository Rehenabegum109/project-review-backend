
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import { rateLimit } from "express-rate-limit";
import helmetPackage from "helmet";
import type { RequestHandler } from "express";
import authRoute from "./module/auth/auth.route.js";
import submissionRoute from "./module/submissions/submission.routes.js";
import reviewRoute from "./module/reviews/review.routes.js";
import adminRoute from "./module/admin/admin.routes.js";


const helmetMiddleware =
  helmetPackage as unknown as () => RequestHandler;
const app = express();

app.set("trust proxy", 1);

app.use(helmetMiddleware());

// Production frontend only
const frontendUrl = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);

// Body parsing and cookies
app.use(express.json());
app.use(cookieParser());

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  }),
);

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Project Review Dashboard API is running!",
  });
});

// Health endpoint
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

// API routes
app.use("/api/auth", authRoute);
app.use("/api/submissions", submissionRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/admin", adminRoute);

export default app;
