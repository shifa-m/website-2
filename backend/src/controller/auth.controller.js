import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const signup=async(req,res,next)=>{

            const {username,email,password}=req.body;

            if(!username||!email||!password||username===""||email===""||password===""){
                        return res.status(400).json({
                                    message:"All fields are required"
                        })
            }

            const hashedPassword=bcryptjs.hashSync(password,10)
}