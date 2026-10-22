import type { Request, Response, NextFunction } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: "STUDENT" | "MENTOR" | "ADMIN";
    };
}
export declare const authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const authorize: (...allowedRoles: Array<"STUDENT" | "MENTOR" | "ADMIN">) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map