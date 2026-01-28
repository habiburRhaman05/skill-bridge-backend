

import { prisma } from "../../lib/prisma";
import { StudentProfileUpdate } from "./types";

import bcrypt from "bcrypt"
// 1️⃣ Get profile
const  getProfile= async (userId: string) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profileAvater: true,
        role: true,
        status: true,
        createdAt: true,
        studentBookings:true,
        reviewsGiven:true
      },
    });
  }

    // 2️⃣ Update profile (name, email)
  const updateProfile= async (userId: string, data: StudentProfileUpdate) => {
    return await prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, name: true, email: true, profileAvater: true },
    });
  }

   // 3️⃣ Change password
  const changePassword= async (userId: string, oldPassword: string, newPassword: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { password: hashed } });

    return { message: "Password updated successfully" };
  }

  // 4️⃣ Delete account
 const deleteAccount= async (userId: string) => {
    await prisma.user.delete({ where: { id: userId } });
    return { message: "Account deleted successfully" };
  };

export const studentService = {
 getProfile,
 updateProfile,changePassword,deleteAccount



 
};
