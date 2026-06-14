import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


const signup=async(req,res,next)=>{

            const {username,email,password}=req.body;

            if(!username||!email||!password||username===""||email===""||password===""){
                        return res.status(400).json({
                                    message:"All fields are required"
                        })
            }

            const hashedPassword=bcryptjs.hashSync(password,10)

            const newUser=new user({
                        username,
                        email,
                        password:hashedPassword
            })

            try{ 
                        await newUser.save();
                        res.json("Signup Successfully");
            }catch(error){
                        next(error);

            }
};

const signin=async(req,res)=>{

            const {email,password}=req.body;
          
            if(!email||!password||email===""||password===""){
                        return res.status(400).json({
                                    message:"All Fields are required"
                        })
            }

            try{
                        const validUser=await User.findOne({email})
                        if(!validUser){
                                    return next(errorHandler(404,"User not found"))
                        }
                        const validPassword=bcryptjs.compareSync(password,validUser.password)

                        if(!validPassword){
                                    return next(errorHandler(400,"Invalid Password"))
                        }

                        const token=jwt.sign({
                              id:validUser._id,
                              isAdmin:validUser.isAdmin    
                        },process.env.JWT_SECRET);

                        const{password:pass,...rest}=validUser._doc;//username,password,email,isAdmin doc k under rahte

                        const cookieOptions={
                                    httpOnly:true,
                        }  

                        if(process.env.NODE_ENV==="production"){
                              cookieOptions.sameSite='none';//cookie ko kounsi b site se allow karo bcoz frontend backend dono alag port po chaltin use
                              cookieOptions.secure=true;//https se allow connection sirf https se hi ana allowed
                        }

                        res.status(200).cookie('access_token',token,cookieOptions).json(rest);
            }catch(error){
                        next(error)
            }




}