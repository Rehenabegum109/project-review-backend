
import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middleware/auth.middleware.js";
import {
  listUsers,
  listSubmissions,
  dashboardStats,
  createUser,
} from "./admin.controller.js";

const adminRoute = Router();

adminRoute.use(authenticate, authorize("ADMIN"));

adminRoute.get("/users", listUsers);
adminRoute.post("/users", createUser);
adminRoute.get("/submissions", listSubmissions);
adminRoute.get("/stats", dashboardStats);

export default adminRoute;
