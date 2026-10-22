import { createSubmission, getMySubmissions, } from "./submission.service.js";
import httpStatus from "../../constants/httpStatus.js";
export const submitProject = async (req, res) => {
    try {
        const { title, description, githubUrl, liveUrl } = req.body ?? {};
        if (typeof title !== "string" ||
            typeof description !== "string" ||
            typeof githubUrl !== "string" ||
            !title.trim() ||
            !description.trim() ||
            !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(githubUrl.trim()) ||
            (liveUrl != null &&
                (typeof liveUrl !== "string" ||
                    !/^https?:\/\/\S+$/.test(liveUrl.trim())))) {
            res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Provide a title, description, valid GitHub repository URL and optional valid live URL.",
            });
            return;
        }
        const submission = await createSubmission(req.user.userId, {
            title,
            description,
            githubUrl,
            liveUrl,
        });
        res.status(httpStatus.CREATED).json({
            success: true,
            message: "Project submitted successfully.",
            data: submission,
        });
    }
    catch (error) {
        console.error("Project submission error:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Could not submit project.",
        });
    }
};
export const listMySubmissions = async (req, res) => {
    try {
        const submissions = await getMySubmissions(req.user.userId);
        res.status(httpStatus.OK).json({
            success: true,
            data: submissions,
        });
    }
    catch (error) {
        console.error("Fetch submissions error:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Could not fetch submissions.",
        });
    }
};
//# sourceMappingURL=submission.controller.js.map