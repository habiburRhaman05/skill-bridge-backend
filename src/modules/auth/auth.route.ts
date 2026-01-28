
import { Router } from "express";

import { authMiddleware, roleMiddleware} from "../../middleware/auth-middlewares";
import { authControllers } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { authSchemas } from "./auth.schema";
import { studentSchemas } from "../student/student.schema";
import { studentController } from "../student/student.controller";


const router:Router = Router();

router.post("/register",validateRequest(authSchemas.registerUserSchema), authControllers.registerController);
router.post("/login",validateRequest(authSchemas.loginSchema), authControllers.loginController);
router.get("/me", authMiddleware, authControllers.meController);
//  ============== FOR STUDENT/USER AND TUTOR BOTH CAN USE IT ==============

router.put("/change-password",authMiddleware,roleMiddleware(['STUDENT',"TUTOR"]), validateRequest(studentSchemas.changePasswordSchema), studentController.changePassword);
router.delete("/delete-account",authMiddleware,roleMiddleware(['STUDENT',"TUTOR"]), studentController.deleteAccount);
export default router;
