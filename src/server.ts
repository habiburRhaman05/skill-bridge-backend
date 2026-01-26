import { startServer } from "./app";
import { connectToDatabase } from "./config/db"

(async()=>{
    await connectToDatabase();
    await startServer();
})()
