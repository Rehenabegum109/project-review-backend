
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
type AdminUserRole = "STUDENT" | "MENTOR" | "ADMIN";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAllSubmissions = async () => {
  return prisma.projectSubmission.findMany({
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      review: {
        select: {
          feedback: true,
          status: true,
          mentorId: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getDashboardStats = async () => {
  const [totalUsers, totalSubmissions, pendingSubmissions, approvedSubmissions, rejectedSubmissions] =
    await Promise.all([
      prisma.user.count(),
      prisma.projectSubmission.count(),
      prisma.projectSubmission.count({
        where: { status: "PENDING" },
      }),
      prisma.projectSubmission.count({
        where: { status: "APPROVED" },
      }),
      prisma.projectSubmission.count({
        where: { status: "REJECTED" },
      }),
    ]);

  return {
    totalUsers,
    totalSubmissions,
    pendingSubmissions,
    approvedSubmissions,
    rejectedSubmissions,
   
  };
};
export const createAdminUser = async (
  name: string,
  email: string,
  password: string,
  role: AdminUserRole,
) => {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName || !normalizedEmail || !password) {
    throw new Error("MISSING_REQUIRED_FIELDS");
  }

  if (normalizedName.length > 100) {
    throw new Error("INVALID_NAME");
  }

  if (password.length < 8) {
    throw new Error("WEAK_PASSWORD");
  }

  if (!["STUDENT", "MENTOR", "ADMIN"].includes(role)) {
    throw new Error("INVALID_ROLE");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  return prisma.user.create({
    data: {
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};