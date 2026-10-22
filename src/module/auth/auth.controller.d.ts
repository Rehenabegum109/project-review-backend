import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMe: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const logout: (_req: Request, res: Response) => Response<any, Record<string, any>>;
//# sourceMappingURL=auth.controller.d.ts.map