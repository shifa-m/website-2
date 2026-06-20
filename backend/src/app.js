import  express from "express"
import mongoose from "mongoose"
import dotenv, { configDotenv } from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import cookieParser from "cookie-parser"
import connectDB from "./db/db.js"

if(process.env.NODE_ENV!=="production"){
            dotenv.config();
}

const app=express();

app.use(cors({
            origin:
            process.env.NODE_ENV==="production"?[

            ]:['http://localhost:5173','http://localhost:3000'],
            credentials:true,
            methods:['GET',"POST","PUT","DELETE","OPTIONS"],
            allowedHeaders:["Content-Type","Authorization","x-requested-with"]



}));

app.use(express.json())
app.use(cookieParser())

const connectMiddleware=async(req,res,next)=>{
            try{
                        await connectDB();
                        next();

            }catch(error){
                        res.status(500).json({
                                    success:false,message:"Database connection falied"
                        })

            }
};

app.get("/api/test",(req,res)=>{
            res.json({message:"API is working",timestamp:new Date()});
})

app.get("/api/debug",(req,res)=>{
            res.json({
                        message:"Debug Info",
                        nodeEnv:process.env.NODE_ENV,
                        hasMongoEnv:!!process.env.MONGO,
                        hasJwtSecret:!!process.env.JWT_SECRET,
                        timestamp:new Date(),
            })
})

export default app