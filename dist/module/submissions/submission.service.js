import { prisma } from "../../lib/prisma.js";
export const createSubmission = async (studentId, data) => {
    return prisma.projectSubmission.create({
        data: {
            title: data.title.trim(),
            description: data.description.trim(),
            githubUrl: data.githubUrl.trim(),
            liveUrl: data.liveUrl?.trim() || null,
            studentId,
        },
    });
};
export const getMySubmissions = async (studentId) => {
    return prisma.projectSubmission.findMany({
        where: { studentId },
        include: {
            review: {
                select: {
                    feedback: true,
                    status: true,
                    createdAt: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
//# sourceMappingURL=submission.service.js.map