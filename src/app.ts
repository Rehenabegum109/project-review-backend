
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoute from "./module/auth/auth.route.js";
import submissionRoute from "./module/submissions/submission.routes.js";
import reviewRoute from "./module/reviews/review.routes.js";
import adminRoute from "./module/admin/admin.routes.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://review-flow-625j-wheat.vercel.app",
  "http://localhost:3000",
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as server-to-server calls.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

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

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Project Review Dashboard API is running!",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/submissions", submissionRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/admin", adminRoute);

export default app;