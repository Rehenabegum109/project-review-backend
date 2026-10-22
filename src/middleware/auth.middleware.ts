
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: "STUDENT" | "MENTOR" | "ADMIN";
  };
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from .env");
  }

  return secret;
};

const AUTH_COOKIE_NAME = "reviewflow_token";

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  // Read JWT from the httpOnly cookie
  const token = req.cookies?.[AUTH_COOKIE_NAME];

  if (typeof token !== "string" || !token) {
    res.status(401).json({
      success: false,
      message: "Authentication cookie is required.",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      !["STUDENT", "MENTOR", "ADMIN"].includes(
        String(decoded.role),
      )
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
      return;
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role as "STUDENT" | "MENTOR" | "ADMIN",
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
      return;
    }

    console.error("Authentication error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const authorize = (
  ...allowedRoles: Array<"STUDENT" | "MENTOR" | "ADMIN">
) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Please authenticate first.",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource.",
      });
      return;
    }

    next();
  };
};
