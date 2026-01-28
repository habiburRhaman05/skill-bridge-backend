import { startServer } from "./app";
import { connectToDatabase } from "./config/db"
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);

(async()=>{
    await connectToDatabase();
    await startServer();
})()
