import rateLimit from "express-rate-limit";

export const submissionRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many submission attempts. Please try again after 15 minutes.",
  },
});
