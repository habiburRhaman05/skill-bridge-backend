
import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../../middleware/auth-middlewares";
import { validateRequest } from "../../middleware/validateRequest";
import { bookingSchemas } from "./booking.schema";
import { bookingControllers } from "./booking.controller";

const router:Router = Router();


router.post("/",authMiddleware,roleMiddleware(["STUDENT"]),validateRequest(bookingSchemas.bookingCreateSchema),bookingControllers.createBooking)
router.get("/",authMiddleware,roleMiddleware(["STUDENT"]),bookingControllers.getAllBookings)
router.get("/:id",authMiddleware,roleMiddleware(["STUDENT"]),bookingControllers.getBookingsDeatils)
router.patch("/:id/cancel-booking",authMiddleware,roleMiddleware(["STUDENT"]),bookingControllers.cancelBooking)



export default router;
