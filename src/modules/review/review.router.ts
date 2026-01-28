
import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../../middleware/auth-middlewares";
import { validateRequest } from "../../middleware/validateRequest";
import { reviewSchemas } from "./review.schema";
import { reviewControllers } from "./review.controller";

const router:Router = Router();


router.post("/",authMiddleware,roleMiddleware(["STUDENT"]),validateRequest(reviewSchemas.createReviewSchema),reviewControllers.createReview)




export default router;
