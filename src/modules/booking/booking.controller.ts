
import  { NextFunction, Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { sendSuccess } from "../../utils/apiResponse";


const createBooking = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const studentId = req.user?.userId!
    const booking = await bookingServices.createBooking(studentId,req.body);
    return sendSuccess(res,{
      statusCode:201,
      message:"booking created successfully",
      data:booking
    })
  } catch (error) {
next(error)
  }
}

const getAllBookings  = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const studentId = req.user?.userId!
    const bookings = await bookingServices.getAllBookings(studentId);
    return sendSuccess(res,{
      statusCode:200,
      message:"your bookings fetch successfully",
      data:bookings || []
    })
  } catch (error) {
next(error)
  }
}
const getBookingsDeatils  = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const bookingId = req.params.id as string
    console.log(bookingId);
    
    const booking = await bookingServices.getBookingDetails(bookingId);
    return sendSuccess(res,{
      statusCode:200,
      message:"your bookings fetch successfully",
      data:booking || {}
    })
  } catch (error) {
next(error)
  }
}

 export const bookingControllers = {
    
   createBooking,
   getBookingsDeatils,getAllBookings
 }