import mongoose from "mongoose";


async function  connectDB(req,res){

            try{

                        await mongoose.connect("");

                        console.log("Database has been connected successfully")



            }catch(error){

                        console.log("Database error",error)

            }


}

export default connectDB