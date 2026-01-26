
import { Router } from "express";
import { authMiddleware, roleMiddleware} from "../../middleware/auth-middlewares";
import { tutorControllers } from "./tutor.controller";

const router:Router = Router();

router.post("/create-profile",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.createProfile);


export default router;
