
import { Request, Response } from "express";
import { tutorServices } from "./tutor.service";


// -------------------- CREATE PROFILE --------------------

  const createProfile =async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId; // injected by authMiddleware
      const profile = await tutorServices.createTutorProfile(userId, req.body);
      res.status(201).json({ message: "Profile created successfully", profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // -------------------- UPDATE PROFILE --------------------
 const updateProfile=async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const profile = await tutorServices.updateTutorProfile(userId, req.body);
      res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // -------------------- GET PROFILE --------------------
 const getProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const profile = await tutorServices.getTutorProfile(userId);
      res.status(200).json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // -------------------- GET TUTOR SESSIONS --------------------
 const getTutorSessions = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const sessions = await tutorServices.getTutorSessions(userId);
      res.status(200).json({
        message:"session fetch successfully",
        data:sessions
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // -------------------- PUT TUTOR ADD AVIAVLEITY --------------------
 const addAvailabilityController = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const {availability} = req.body;

      const updatedData = await tutorServices.addAvailabilityService(userId,availability);
      res.status(200).json({
        message:"added availability successfully",
        data:updatedData
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // -------------------- PUT MARKD SESSION FINISH  --------------------
 const markdSessionFinishController = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const sessionId = req.params.sessionId as string

      const updateSession = await tutorServices.markdSessionFinish(userId,sessionId);
      res.status(200).json({
        message:"session marked sucessfully",
        data:updateSession
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


 export const tutorControllers = {
    createProfile,
    updateProfile,
    getProfile,
    getTutorSessions,
    addAvailabilityController,
    markdSessionFinishController
   
 }