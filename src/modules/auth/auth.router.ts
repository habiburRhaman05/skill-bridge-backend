
import { Router } from "express";

import { authMiddleware} from "../../middleware/auth-middlewares";
import { authControllers } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { authSchemas } from "./auth.schema";


const router:Router = Router();

router.post("/register",validateRequest(authSchemas.registerUserSchema), authControllers.registerController);
router.post("/login",validateRequest(authSchemas.loginSchema), authControllers.loginController);
router.get("/me", authMiddleware, authControllers.meController);

export default router;
