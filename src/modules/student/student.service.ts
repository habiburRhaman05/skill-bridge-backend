

import { toResponse } from "better-auth/*";
import { prisma } from "../../lib/prisma";
import { StudentProfileUpdate } from "./types";

import bcrypt from "bcrypt"

const  getProfile= async (userId: string) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      include:{
        studentBookings:true,
        reviewsGiven:true,
    
      }
    });
  }

  
  const updateProfile= async (userId: string, data: StudentProfileUpdate) => {
    return await prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, name: true, email: true, profileAvater: true },
    });
  }

  const changePassword= async (userId: string, oldPassword: string, newPassword: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { password: hashed } });

    return { message: "Password updated successfully" };
  }


 const deleteAccount= async (userId: string) => {
    await prisma.user.delete({ where: { id: userId } });
    return { message: "Account deleted successfully" };
  };

const getStudentStatsData = async (userId: string) => {
  const now = new Date();

  const [
    totalBooking,
    upcomingBooking,
    totalReview,
  ] = await Promise.all([
    prisma.booking.count({
      where: { studentId: userId },
    }),
    prisma.booking.count({
      where: {
        studentId: userId,
        dateTime: { gte: now },
      },
    }),
    prisma.review.count({
      where: { studentId: userId },
    }),
  ]);

  return {
    totalBooking,
    upcomingBooking,
    totalReview,
  };
};



export const studentService = {
 getProfile,
 updateProfile,changePassword,deleteAccount,
getStudentStatsData


 
};
