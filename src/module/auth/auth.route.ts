
import { Router } from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/me", authenticate, getMe);
authRoute.post("/logout", logout);

export default authRoute;
