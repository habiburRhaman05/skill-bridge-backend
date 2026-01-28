
import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";


const getProfile = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId }
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};


const updateUserStatus = async (userId: string, status: UserStatus) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status },
    select: { id: true, name: true, email: true, status: true },
  });
};

export const adminServices = {
  getProfile,
  getAllUsers,
  updateUserStatus,
};
