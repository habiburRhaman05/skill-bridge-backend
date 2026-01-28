import { NextFunction, Request, Response } from "express";
import { reviewsServives } from "./review.service";
import { sendSuccess } from "../../utils/apiResponse";

const createReview = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const studentId = req.user?.userId!
        const newReview = await reviewsServives.createReview({...req.body,studentId});
        return sendSuccess(res,{
            statusCode:201,
            message:"your Review Created successfully",
            data:newReview
        })
    } catch (error) {
     next(error)   
    }
}

export const reviewControllers = {createReview}