import type { CookieOptions, Response } from "express";
export declare const AUTH_COOKIE_NAME = "reviewflow_token";
export declare const authCookieOptions: CookieOptions;
export declare const setAuthCookie: (res: Response, token: string) => void;
export declare const clearAuthCookie: (res: Response) => void;
//# sourceMappingURL=cookie.d.ts.map