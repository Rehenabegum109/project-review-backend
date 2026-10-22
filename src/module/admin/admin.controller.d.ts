import type { Request, Response } from "express";
export declare const listUsers: (_req: Request, res: Response) => Promise<void>;
export declare const listSubmissions: (_req: Request, res: Response) => Promise<void>;
export declare const dashboardStats: (_req: Request, res: Response) => Promise<void>;
export declare const createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=admin.controller.d.ts.map