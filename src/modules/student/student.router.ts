
import { Router } from "express";
import { studentController } from "./student.controller";
import { authMiddleware, roleMiddleware } from "../../middleware/auth-middlewares";
import { validateRequest } from "../../middleware/validateRequest";
import { studentSchemas } from "./student.schema";

const router:Router = Router();

// Only students can access these routes
router.use(authMiddleware, roleMiddleware(["STUDENT"]));

router.get("/profile", studentController.getProfile);
router.put("/profile", studentController.updateProfile);
router.put("/change-password",validateRequest(studentSchemas.changePasswordSchema), studentController.changePassword);
router.delete("/delete-account", studentController.deleteAccount);

export default router;
