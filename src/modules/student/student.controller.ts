
import { Request, Response } from "express";
import { studentService } from "./student.service";
 const getProfile= async (req: Request, res: Response) => {
    try {
      const user = await studentService.getProfile(req.user!.userId);
      res.json({ success: true, user });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

 const updateProfile= async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const updated = await studentService.updateProfile(req.user!.userId, data);
      res.json({ success: true, user: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  const changePassword=async (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const result = await studentService.changePassword(req.user!.userId, oldPassword, newPassword);
      res.json({ success: true, message: result.message });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  const deleteAccount= async (req: Request, res: Response) => {
    try {
      const result = await studentService.deleteAccount(req.user!.userId);
      res.json({ success: true, message: result.message });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
export const studentController = {
 getProfile,updateProfile,changePassword,deleteAccount
};
