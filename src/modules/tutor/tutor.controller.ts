
import { NextFunction, Request, Response } from "express";
import { tutorServices } from "./tutor.service";


// -------------------- CREATE PROFILE --------------------

  const createProfile =async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!; // injected by authMiddleware
      const profile = await tutorServices.createTutorProfile(userId, req.body);
      res.status(201).json({ message: "Profile created successfully", profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // -------------------- UPDATE PROFILE --------------------
 const updateProfile=async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!;
      const profile = await tutorServices.updateTutorProfile(userId, req.body);
      res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // -------------------- GET PROFILE --------------------
 const getProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!;
      const profile = await tutorServices.getTutorProfile(userId);
      res.status(200).json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // -------------------- GET TUTOR SESSIONS --------------------
 const getTutorSessions = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!;
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
 const getAvailability = async (req: Request, res: Response) => {
    try {
     const tutorUserId =req.user?.userId!;
  const result = await tutorServices.getAvailability(tutorUserId);

  res.status(200).json({
    success: true,
    data: result,
  });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // -------------------- PUT TUTOR ADD AVIAVLEITY --------------------
 const addAvailabilityController = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!;

     
      const updatedData = await tutorServices.addAvailabilityService(userId,req.body);
      res.status(200).json({
        message:"added availability successfully",
        data:updatedData
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // -------------------- PUT TUTOR ADD AVIAVLEITY --------------------
 const deleteAvailability = async (req: Request, res: Response) => {
    try {
    const tutorUserId =req.user?.userId!;
    const availabilityId = req.params.id as string

    await tutorServices.deleteAvailability(tutorUserId, availabilityId);

    res.status(200).json({
      success: true,
      message: "Availability removed",
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
  }
  // -------------------- PUT MARKD SESSION FINISH  --------------------
 const markdSessionFinishController = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId!;
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
  // -------------------- GET ALL TUTORS LIST CONTROLLER  --------------------

 const gettingAllTutorsLists = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const allTutors = await tutorServices.getAllTutors();
     return res.status(200).json({
      success:true,
      message:"fetch tutors successfully",
      data:allTutors
     })
    } catch (error: any) {
     next(error)
    }
  }


  // -------------------------------------- TUTORS PUBLIC ROUTES ----------------------------

    // -------------------- GET TUTOR PROFILE DETAILS --------------------
 const getTutorProfileDetails = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).params.id
      const sessions = await tutorServices.getTutorProfilePublic(userId);
      res.status(200).json({
        message:"tutor profile fetch successfully",
        data:sessions
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
    markdSessionFinishController,
    gettingAllTutorsLists,
    deleteAvailability,
    getAvailability,
    getTutorProfileDetails
   
 }