import { NextFunction, Request, Response } from "express";
import { sharedServices } from "./shared.service";
import { sendSuccess } from "../../utils/apiResponse";

const getAllCategories = async (req:Request,res:Response,next:NextFunction) =>{
   try {
     const categories = await sharedServices.getAllCategories();
     return sendSuccess(res,{
        statusCode:200,
        message:"fetch all categories succesfully",
        data:categories
     })
   } catch (error) {
     next(error)
   }
}

export const sharedControllers = {getAllCategories}