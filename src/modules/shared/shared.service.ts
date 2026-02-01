import { prisma } from "../../lib/prisma";

// -------------------- GET ALL CATEGORIES --------------------
const getAllCategories = async () => {
 
    const categories = await prisma.category.findMany({

    });
  
  return categories;
};




export const sharedServices = {

getAllCategories

}