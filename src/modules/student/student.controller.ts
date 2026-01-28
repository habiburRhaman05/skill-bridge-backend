
import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import { sendSuccess } from "../../utils/apiResponse";
 const getProfile= async (req: Request, res: Response,next:NextFunction) => {
    try {
      const user = await studentService.getProfile(req.user!.userId);
  
      return sendSuccess(res,{
        statusCode:200,
        message:"fetch profile successfully",
        data:user
      })
    } catch (err: any) {
      next(err)
    }
  }

 const updateProfile= async (req: Request, res: Response,next:NextFunction) => {
    try {
      const data = req.body;
      const updated = await studentService.updateProfile(req.user!.userId, data);
    return sendSuccess(res,{
        statusCode:200,
        message:" profile updated successfully",
        data:updated
      })
    } catch (err: any) {
            next(err)

    }
  }
  const changePassword=async (req: Request, res: Response,next:NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const result = await studentService.changePassword(req.user!.userId, oldPassword, newPassword);
     return sendSuccess(res,{
        statusCode:200,
        message:"password change successfully",
      })
    } catch (err: any) {
           next(err)

    }
  }

  const deleteAccount= async (req: Request, res: Response,next:NextFunction) => {
    try {
   await studentService.deleteAccount(req.user!.userId);
    return sendSuccess(res,{
        statusCode:200,
        message:"account delete successfully",
    
      })
    } catch (err: any) {
    next(err)
    }
  }
export const studentController = {
 getProfile,updateProfile,changePassword,deleteAccount
};
