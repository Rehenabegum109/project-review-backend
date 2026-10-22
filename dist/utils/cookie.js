export const AUTH_COOKIE_NAME = "reviewflow_token";
export const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
};
export const setAuthCookie = (res, token) => {
    res.cookie(AUTH_COOKIE_NAME, token, authCookieOptions);
};
export const clearAuthCookie = (res) => {
    res.clearCookie(AUTH_COOKIE_NAME, {
        httpOnly: authCookieOptions.httpOnly,
        secure: authCookieOptions.secure,
        sameSite: authCookieOptions.sameSite,
        path: authCookieOptions.path,
    });
};
//# sourceMappingURL=cookie.js.map