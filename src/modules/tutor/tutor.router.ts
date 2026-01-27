
import { Router } from "express";
import { authMiddleware, roleMiddleware} from "../../middleware/auth-middlewares";
import { tutorControllers } from "./tutor.controller";

const router:Router = Router();

router.post("/profile",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.createProfile);
router.put("/profile",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.updateProfile);
router.get("/sessions",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.getTutorSessions);

// mark session complete
router.put("/sessions/:sessionId/finish-session",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.markdSessionFinishController);
// add availibity slot or delete
router.put("/availability",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.addAvailabilityController);
// get reviews 



export default router;
