import { startServer } from "./app";
import { connectToDatabase, prisma } from "./config/db"
import bcrypt from "bcrypt"
(async()=>{
    await connectToDatabase();
    await startServer();
})()


