
import { Router } from "express";

import { authMiddleware} from "../../middleware/auth-middlewares";
import { authControllers } from "./auth.controller";


const router:Router = Router();

router.post("/register", authControllers.registerController);
router.post("/login", authControllers.loginController);
router.get("/me", authMiddleware, authControllers.meController);

export default router;
