// src/modules/tutor/tutor.service.ts
import { prisma } from "../../lib/prisma";
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
      categories: payload.categories,
      hourlyRate: payload.hourlyRate,
      availability: payload.availability, // string[]
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
      availability: payload.availability ?? profile.availability,
    },
  });

  return updated;
};

// -------------------- GET TUTOR PROFILE --------------------
 const getTutorProfile = async (userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    include: { user: { select: { name: true, email: true } } },
  });
  if (!profile) throw new Error("Tutor profile not found");
  return profile;
};

 export const tutorServices = {
    getTutorProfile,createTutorProfile,updateTutorProfile
 }