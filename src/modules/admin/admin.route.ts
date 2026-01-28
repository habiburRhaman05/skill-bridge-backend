
import { Router } from "express";
import { adminControllers } from "./admin.controller";
import { authMiddleware, roleMiddleware } from "../../middleware/auth-middlewares";

const router:Router = Router();

// All routes protected: only ADMIN role
router.use(authMiddleware, roleMiddleware(["ADMIN"]));


router.get("/profile", adminControllers.getProfile);

router.get("/users", adminControllers.getAllUsers);

router.patch("/users/:id/status", adminControllers.updateUserStatus);

export default router;
