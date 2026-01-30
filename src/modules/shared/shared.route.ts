
import { Router } from "express";
import { authMiddleware, roleMiddleware} from "../../middleware/auth-middlewares";
import { sharedControllers } from "./shared.controller";

const router:Router = Router();




router.get("/categories",sharedControllers.getAllCategories)//Get all tutors with filters




export default router;
