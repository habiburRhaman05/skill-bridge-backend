// src/modules/tutor/tutor.service.ts
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { authServices } from "../auth/auth.service";
import { TutorProfileCreatePayload, TutorProfileUpdatePayload } from "./types";

// -------------------- CREATE TUTOR PROFILE --------------------
const createTutorProfile = async (userId: string, payload: TutorProfileCreatePayload) => {
  // Check if profile already exists
  const existing = await prisma.tutorProfile.findUnique({ where: { userId } });
  if (existing) throw new Error("Tutor profile already exists");

  const profile = await prisma.tutorProfile.create({
    data: {
      userId,
      bio: payload.bio,
      subjects: payload.subjects,
      hourlyRate: payload.hourlyRate,
      category: payload.category
    },
  });
  return profile;
};

// -------------------- UPDATE TUTOR PROFILE --------------------
const updateTutorProfile = async (userId: string, payload: TutorProfileUpdatePayload) => {
  const profile = await prisma.tutorProfile.findUnique({ where: { userId } });
  if (!profile) throw new Error("Tutor profile not found");

  const updated = await prisma.tutorProfile.update({
    where: { userId },
    data: {
      bio: payload.bio ?? profile.bio,
      hourlyRate: payload.hourlyRate ?? profile.hourlyRate,
      subjects: payload.subjects ?? profile.subjects,
    },
  });

  return updated;
};

// -------------------- GET TUTOR PROFILE --------------------
const getTutorProfile = async (userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    include: { user: true },
  });
  if (!profile) throw new Error("Tutor profile not found");
  return profile;
};
// -------------------- GET TUTOR SESSIONS --------------------

const getTutorSessions = async (userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });
  if (!profile) throw new Error("Tutor profile not found");

  const sessions = await prisma.booking.findMany({
    where: {
      tutorId: profile.id
    }
  });

  return sessions
};

// -------------------- PUT TUTOR CREATE AVAILABITY SLOT --------------------

const addAvailabilityService = async (userId: string, payload: any) => {
 const { date, startTime, endTime } = payload;

  // if (!date || !startTime || !endTime) {
  //   throw { statusCode: 400, message: "date, startTime, endTime required" };
  // }

  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!tutor) {
    throw { statusCode: 404, message: "Tutor profile not found" };
  }

  // 🔒 Prevent overlapping slots
  const overlap = await prisma.availability.findFirst({
    where: {
      tutorId: tutor.id,
      date: new Date(date),
      OR: [
        {
          startTime: { lt: endTime },
          endTime: { gt: startTime },
        },
      ],
    },
  });

  if (overlap) {
    throw { statusCode: 409, message: "Time slot overlaps existing slot" };
  }

  return prisma.availability.create({
    data: {
      tutorId: tutor.id,
      date: new Date(date),
      startTime,
      endTime,
    },
  });

};

// -------------------- GET TUTOR  AVAILABITY SLOTS --------------------

const getAvailability = async (tutorUserId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId: tutorUserId },
  });

  if (!tutor) {
    throw { statusCode: 404, message: "Tutor not found" };
  }

  return prisma.availability.findMany({
    where: {
      tutorId: tutor.id,
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });
};
// -------------------- DELETE TUTOR  AVAILABITY SLOT --------------------

const deleteAvailability = async (
  tutorUserId: string,
  availabilityId: string
) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId: tutorUserId },
  });

  if (!tutor) {
    throw { statusCode: 404, message: "Tutor not found" };
  }

  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });

  if (!slot || slot.tutorId !== tutor.id) {
    throw { statusCode: 403, message: "Unauthorized" };
  }

  if (slot.isBooked) {
    throw {
      statusCode: 400,
      message: "Cannot delete booked availability",
    };
  }

  await prisma.availability.delete({
    where: { id: availabilityId },
  });
};

// -------------------- PUT MARK AS SESSION FINISH  --------------------

const markdSessionFinish = async (userId: string, bookingId: string) => {

  await authServices.isUserExist(userId, "TUTOR");

  const isBookingExist = await prisma.booking.findFirst({
    where: {
      tutorId: userId
    }
  })

  if (!isBookingExist) {
    throw new AppError("Bookign not found")
  }
  const updatedData = await prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      status: "COMPLETED"
    }
  });

  return updatedData

};

// -------------------- GET ALL TUTORS LIST  --------------------

const getAllTutors = async () => {



  const tutors = await prisma.user.findMany({
    where: {
      role: "TUTOR"
    }
  });

  return tutors



};



// ---------------------- TUTORS PUBLIC ROUTES ---------------------

// -------------------- GET TUTOR PUBLIC PROFILE DETAILS --------------------


const getTutorProfilePublic = async (tutorUserId: string) => {
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId: tutorUserId },
    include: {
    
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      availability:true
    },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }

  const reviews = await prisma.review.findMany({
    where: { tutorId: tutorProfile.id },
    include: {
      student: {
        select: {
          id: true,
          name: true,
        },
      },
      booking: {
        select: {
          id: true,
          dateTime: true,
        },
      },
    },
  });

  return {
    tutor: tutorProfile,
    reviews,
  };
};



export const tutorServices = {
  getTutorProfile, createTutorProfile, updateTutorProfile, getTutorSessions, addAvailabilityService,
  markdSessionFinish,
  getAllTutors,
  getTutorProfilePublic,
 getAvailability,
 deleteAvailability


}