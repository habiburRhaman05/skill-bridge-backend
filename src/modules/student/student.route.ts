
import { Router } from "express";
import { studentController } from "./student.controller";
import { authMiddleware, roleMiddleware } from "../../middleware/auth-middlewares";

const router:Router = Router();

// Only students can access these routes


router.get("/profile",authMiddleware,roleMiddleware(["STUDENT"]), studentController.getProfile);
router.put("/profile",authMiddleware,roleMiddleware(["STUDENT"]), studentController.updateProfile);
router.get("/dashboard/stats", studentController.getStudentdashboardStats);


export default router;
