import mongoose from "mongoose";

let isConnected=false
const connectDB=async()=>{
            if(isConnected) return;

            try{

                        await mongoose.connect(process.env.MONGO,{
                        serverSelectionTimeoutMS:10000,//agar 10 sec my connection fail kardalte 
                        socketTimeoutMS:45000,//connect hone k bad kohi b operation bhut time ny chaliya toh socket close karna,
                        maxPoolSize:1,//MongoDB kitne connections ek saath maintain kare.
                           minPoolSize:0,     
                        });
                        isConnected=true;
                        console.log("Connected to MongoDB")

            }catch(err){

                        console.log("MongoDB connection error",err.message)
                        isConnected=false;
                        throw err

            }
};



export default connectDB