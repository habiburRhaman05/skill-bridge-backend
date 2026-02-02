// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { authServices } from "./auth.service";
import { sendSuccess } from "../../utils/apiResponse";

// -------------------- REGISTER --------------------
 const registerController = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const { user, token } = await authServices.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// -------------------- LOGIN --------------------
 const loginController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authServices.loginUser(req.body);
const isProd = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProd,                 // ❗ HTTPS only
  sameSite: isProd ? "none" : "lax",
  path: "/",
});
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// -------------------- GET CURRENT USER --------------------
 const meController = async (req: Request, res: Response) => {
  try {
    // userId injected by auth middleware
    const user = await authServices.getCurrentUser((req as any).user.userId);
   return sendSuccess(res,{
    data:user
   })
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
    // --------------------  POST LOGOUT CURRENT USER --------------------

 const logoutController = async (req: Request, res: Response) => {
  try {


 res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
});



    return res.status(200).json({
      message: "Logout successful",
  
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const authControllers = {registerController,loginController,meController,logoutController}