import express, { type Express } from 'express';
import { envConfig } from './config/env';
import { applyMiddleware } from './middleware';
import { errorHandler } from './middleware/errorHandler';

import authRouter from "./modules/auth/auth.router";
import tutorRouter from "./modules/tutor/tutor.router";

import cors from "cors";
import { corsConfig } from './config/cors';

const app: Express = express();
app.use(cors(corsConfig))
// app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json({ limit: '1mb' }));
app.set("trust proxy", 1);

app.use("/api/auth",authRouter)
app.use("/api/tutor",tutorRouter)
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

app.use(errorHandler);


export default app;
