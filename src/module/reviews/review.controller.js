import httpStatus from "../../constants/httpStatus.js";
import { reviewSubmission, getPendingSubmissions, getMyReviews, getAllReviews, } from "./review.service.js";
export const submitReview = async (req, res) => {
    try {
        const submissionId = req.params.submissionId;
        const { feedback, status } = req.body ?? {};
        if (typeof submissionId !== "string" || !submissionId) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "A valid submission ID is required.",
            });
            return;
        }
        if (typeof feedback !== "string" ||
            !feedback.trim() ||
            typeof status !== "string" ||
            !["APPROVED", "REJECTED"].includes(status)) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Provide feedback and a valid review status (APPROVED or REJECTED).",
            });
            return;
        }
        const review = await reviewSubmission(req.user.userId, submissionId, feedback, status);
        res.status(httpStatus.OK).json({
            success: true,
            message: "Project reviewed successfully.",
            data: review,
        });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "SUBMISSION_NOT_FOUND") {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "Submission not found.",
            });
            return;
        }
        console.error("Review submission error:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Could not review submission.",
        });
    }
};
export const listMyReviews = async (req, res) => {
    try {
        const reviews = await getMyReviews(req.user.userId);
        res.status(httpStatus.OK).json({
            success: true,
            data: reviews,
        });
    }
    catch (error) {
        console.error("Fetch student reviews error:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Could not fetch your reviews.",
        });
    }
};
export const listPendingSubmissions = async (_req, res) => {
    try {
        const submissions = await getPendingSubmissions();
        res.status(httpStatus.OK).json({
            success: true,
            data: submissions,
        });
    }
    catch (error) {
        console.error("Fetch pending submissions error:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Could not fetch pending submissions.",
        });
    }
};
export const listAllReviews = async (_req, res) => {
    try {
        const reviews = await getAllReviews();
        res.status(httpStatus.OK).json({
            success: true,
            data: reviews,
        });
    }
    catch (error) {
        console.error("Fetch all reviews error:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Could not fetch reviews.",
        });
    }
};
//# sourceMappingURL=review.controller.js.map