
import { prisma } from "../../lib/prisma.js";

export const getMyReviews = async (studentId: string) => {
  return prisma.review.findMany({
    where: {
      submission: {
        studentId,
      },
    },
    include: {
      submission: {
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};
export const reviewSubmission = async (
  mentorId: string,
  submissionId: string,
  feedback: string,
  status: "APPROVED" | "REJECTED",
) => {
  return prisma.$transaction(async (tx) => {
    const submission = await tx.projectSubmission.findUnique({
      where: { id: submissionId },
      select: { id: true },
    });

    if (!submission) {
      throw new Error("SUBMISSION_NOT_FOUND");
    }

    const review = await tx.review.upsert({
      where: { submissionId },
      update: {
        feedback: feedback.trim(),
        status,
        mentorId,
      },
      create: {
        submissionId,
        mentorId,
        feedback: feedback.trim(),
        status,
      },
    });

    await tx.projectSubmission.update({
      where: { id: submissionId },
      data: { status },
    });

    return review;
  });
};

export const getPendingSubmissions = async () => {
  return prisma.projectSubmission.findMany({
    where: { status: "PENDING" },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

export const getAllReviews = async () => {
  return prisma.review.findMany({
    include: {
      submission: {
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};