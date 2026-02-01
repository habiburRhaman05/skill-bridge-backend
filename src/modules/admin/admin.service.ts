
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
    where:{
     role:{
      in: ["STUDENT", "TUTOR"],
     },

    },
    orderBy: { createdAt: "desc" },
  });
};
const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include:{
student:true,
availability:true,
review:true,
tutor:{
 include:{
  user:{
    select:{
      name:true
    }
  }
 }
}
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
const createCategory = async (payload:{
  name:string,subjects:string[]
}) => {

  const newCategory = await prisma.category.create({
    data:payload
  });

  return newCategory

};
const deleteCategory = async (categoryId:string) => {

  const newCategory = await prisma.category.delete({
   where:{
    id:categoryId
   }
  });

  return newCategory

};
const updateCategory = async (payload:{
  name:string,subjects:string[],categoryId:string
}) => {

  const newCategory = await prisma.category.update({
   where:{
    id:payload.categoryId
   },
   data:{
    name:payload.name,
    subjects:payload.subjects,
   }
  });

  return newCategory

};

export const adminServices = {
  getProfile,
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  createCategory,
  updateCategory,deleteCategory
};
