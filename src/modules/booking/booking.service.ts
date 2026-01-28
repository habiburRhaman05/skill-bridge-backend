import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";


interface CreateBookingPayload {
  tutorId: string;
  availabilityId: string;
}

const createBooking = async (
  studentId: string,
  payload: CreateBookingPayload
) => {
  const { tutorId, availabilityId } = payload;

  // 1️⃣ Check availability slot
  const availability = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });

  if (!availability) {
    throw new AppError(
      "Availability slot not found"
    );
  }

  if (availability.isBooked) {
    throw new AppError(
      "This slot is already booked"
    );
  }

  if (availability.tutorId !== tutorId) {
    throw new AppError(
      "Tutor mismatch with availability"
    );
  }




  const booking = await prisma.$transaction(async (tx) => {
    // create booking
    const newBooking = await tx.booking.create({
      data: {
        studentId,
        tutorId,
        dateTime: availability.date,
        status: "CONFIRMED",
        availabilityId:payload.availabilityId
      },
    });

    // mark slot booked
    await tx.availability.update({
      where: { id: availability.id },
      data: { isBooked: true },
    });

    return newBooking;
  });

  return booking;
};


const getAllBookings = async (userId: string) => {

  const bookings = await prisma.booking.findMany({
    where: { studentId: userId },
    orderBy: { dateTime: "asc" },
  });


  const tutorIds = [...new Set(bookings.map(b => b.tutorId))];


  const tutors = await prisma.tutorProfile.findMany({
    where: { id: { in: tutorIds } },
  });


  const bookingsWithTutor = bookings.map(b => ({
    ...b,
    tutor: tutors.find(t => t.id === b.tutorId) || null
  }));

  return bookingsWithTutor;
};

const getBookingDetails = async (bookingId: string) => {
 
  const bookingDetails = await prisma.$transaction(async(tx)=>{
     const bookingInfo = await tx.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      student: true,
      availability: true,
      review: true,
      
    },
  });

  const tutorInfo = await tx.tutorProfile.findUnique({
    where:{id:bookingInfo?.tutorId!}
  });

  return {...bookingInfo,tutorProfile:tutorInfo}
  })

  return bookingDetails;
};

export const bookingServices = {
  createBooking,
  getBookingDetails,
  getAllBookings
};
