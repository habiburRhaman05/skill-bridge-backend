
import { Router } from "express";
import { authMiddleware, roleMiddleware} from "../../middleware/auth-middlewares";
import { tutorControllers } from "./tutor.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { tutorSchemas } from "./tutor.schema";

const router:Router = Router();

export const tutorsRouterPublic:Router = Router()

router.post("/profile", authMiddleware,roleMiddleware(["TUTOR"]),validateRequest(tutorSchemas.createTutorProfileSchema), tutorControllers.createProfile);
router.put("/profile",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.updateProfile);
router.get("/sessions",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.getTutorSessions);

// mark session complete
router.put("/sessions/:sessionId/finish-session",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.markdSessionFinishController);
// add availibity slot 
router.put("/availability",authMiddleware,roleMiddleware(["TUTOR"]),validateRequest(tutorSchemas.addAvailabilitySchema), tutorControllers.addAvailabilityController);
router.get("/availability",authMiddleware,roleMiddleware(["TUTOR"]), tutorControllers.getAllAvailabilitys);

router.delete(
  "/availability/:id",
  authMiddleware,
  roleMiddleware(["TUTOR"]),
  tutorControllers.deleteAvailability
);

// public routes

tutorsRouterPublic.get("/",tutorControllers.gettingAllTutorsLists) //Get all tutors with filters
tutorsRouterPublic.get("/:id",tutorControllers.getTutorProfileDetails) // Get tutor details





export default router;
