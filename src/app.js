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
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
}));
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
//# sourceMappingURL=app.js.map