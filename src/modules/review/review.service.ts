import { prisma } from "../../lib/prisma";
import { createReviewPayload, Review } from "./types"


const createReview  = async (payload:createReviewPayload)=>{

 const booking = await prisma.booking.findUnique({
      where: { id: payload.bookingId },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status !== "COMPLETED") {
      throw new Error("Cannot leave review before session is completed");
    }

 const existingReview = await prisma.review.findUnique({
      where: { bookingId: payload.bookingId },
    });

    if (existingReview) {
      throw new Error("Review for this booking already exists");
    }

    // 3️⃣ Create review
    const review = await prisma.review.create({
      data: {
        bookingId: payload.bookingId,
        studentId: payload.studentId,
        tutorId: payload.tutorId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    return review;
  
}

export const reviewsServives = {createReview}