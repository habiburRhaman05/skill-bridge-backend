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
     availability:payload.availability,
      subjects: payload.subjects,
      hourlyRate: payload.hourlyRate,
      category:payload.category
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
      availability: payload.availability?.map((i)=> i.toLowerCase()) ?? profile.availability,
      subjects: payload.subjects ?? profile.subjects,
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
// -------------------- GET TUTOR SESSIONS --------------------

const getTutorSessions = async (userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });
  if (!profile) throw new Error("Tutor profile not found");
  
  const sessions = await prisma.booking.findMany({
    where:{
      tutorId:profile.id
    }
  });
  
  return sessions
};

// -------------------- PUT TUTOR CREATE AVAILABITY SLOT --------------------

const addAvailabilityService = async  (userId:string,availibity:string) => {
  console.log("userid",userId);
  
 const profile = await prisma.tutorProfile.findFirst({
    where: { userId },
  });
  console.log(profile);
  
  if (!profile) throw new Error("Tutor profile not found");
   const updatedData = await prisma.tutorProfile.update({
    where:{
      userId:userId
    },
    data:{
      availability:[...profile.availability,availibity.toLowerCase()]
    }
  });

  return updatedData

};
// -------------------- PUT MARK AS SESSION FINISH  --------------------

const markdSessionFinish = async  (userId:string,bookingId:string) => {
  
 await authServices.isUserExist(userId,"TUTOR");
  
 const isBookingExist = await prisma.booking.findFirst({
 where:{
  tutorId:userId
 }
 })

 if(!isBookingExist){
  throw new AppError("Bookign not found")
 }
   const updatedData = await prisma.booking.update({
    where:{
      id:bookingId
    },
    data:{
      status:"COMPLETED"
    }
  });

  return updatedData

};



 export const tutorServices = {
   getTutorProfile,createTutorProfile,updateTutorProfile,getTutorSessions,addAvailabilityService,
   markdSessionFinish
 }