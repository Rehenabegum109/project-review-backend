
import type { Request, Response } from "express";
import httpStatus from "../../constants/httpStatus.js";
import {
  getAllUsers,
  getAllSubmissions,
  getDashboardStats,
   createAdminUser,
} from "./admin.service.js";

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.status(httpStatus.OK).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Fetch users error:", error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Could not fetch users.",
    });
  }
};

export const listSubmissions = async (_req: Request, res: Response) => {
  try {
    const submissions = await getAllSubmissions();

    res.status(httpStatus.OK).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error("Fetch submissions error:", error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Could not fetch submissions.",
    });
  }
};

export const dashboardStats = async (_req: Request, res: Response) => {
  try {
    const stats = await getDashboardStats();

    res.status(httpStatus.OK).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Fetch dashboard stats error:", error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Could not fetch dashboard statistics.",
    });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof role !== "string"
    ) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Name, email, password and role are required.",
      });
    }

    if (!["STUDENT", "MENTOR", "ADMIN"].includes(role)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid user role.",
      });
    }

    const user = await createAdminUser(name, email, password, role as "STUDENT" | "MENTOR" | "ADMIN");

    return res.status(httpStatus.CREATED).json({
      success: true,
      data: user,
      message: "User created successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "EMAIL_ALREADY_EXISTS") {
        return res.status(httpStatus.CONFLICT).json({
          success: false,
          message: "An account with this email already exists.",
        });
      }

      if (
        error.message === "MISSING_REQUIRED_FIELDS" ||
        error.message === "INVALID_NAME" ||
        error.message === "WEAK_PASSWORD"
      ) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: "Please check the name and password requirements.",
        });
      }
    }

    console.error("Create user error:", error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Could not create user.",
    });
  }
};
