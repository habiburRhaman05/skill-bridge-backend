import express, { type Express } from 'express';
import { envConfig } from './config/env';
import { applyMiddleware } from './middleware';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from "./modules/auth/auth.route";
import tutorRoutes from "./modules/tutor/tutor.route";
import studentRoutes from "./modules/student/student.route";
import bookingRoutes from "./modules/booking/booking.route";
import adminRoutes from "./modules/admin/admin.route";
import {tutorsRouterPublic} from "./modules/tutor/tutor.route";
import cookieParser from "cookie-parser"
import cors from "cors";
import { corsConfig } from './config/cors';
import { notFound } from './middleware/notFound';

const app: Express = express();
app.use(cors(corsConfig))
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.set("trust proxy", 1);

app.use("/api/auth",authRoutes) // auth routes
app.use("/api/tutor",tutorRoutes) // only tutor private routes
app.use("/api/tutors",tutorsRouterPublic) // tutors public access routes
app.use("/api/booking",bookingRoutes) // student only booking routes
app.use("/api/student",studentRoutes) // student only 
app.use("/api/admin",adminRoutes) // admin only 
app.get("/welcome-page",(req,res)=>{
  res.send("welcome to our my app")
})

export const startServer = async () => {

try {

    applyMiddleware(app);

    const PORT = envConfig.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });


  } catch (error) {
    console.error('❌ Error initializing app:', error);
    process.exit(1);
  }
};
app.use(notFound);
app.use(errorHandler);



export default app;
