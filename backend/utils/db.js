import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const DbCon = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongo db is connected")
    } catch (error) {
        console.log("error", error)
    }
} 

export default DbCon;