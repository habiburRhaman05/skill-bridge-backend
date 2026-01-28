import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.service";
import { sendSuccess } from "../../utils/apiResponse";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await adminServices.getProfile(req.user!.userId);
    return sendSuccess(res, {
      statusCode: 200,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminServices.getAllUsers();
    return sendSuccess(res, {
      statusCode: 200,
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// 6️⃣ Update user status
const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const user = await adminServices.updateUserStatus(req.params.id as string, status);
    return sendSuccess(res, {
      statusCode: 200,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const adminControllers = {
  getProfile,

  getAllUsers,
  updateUserStatus,
};