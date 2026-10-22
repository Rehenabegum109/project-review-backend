import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";
export declare const submitReview: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const listMyReviews: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const listPendingSubmissions: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const listAllReviews: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=review.controller.d.ts.map