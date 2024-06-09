import mongoose from "mongoose";

const connectDB = async ()=>{
    return await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB-CONNECTED")
    }).catch((error)=>{
        console.log(`Failed to Connect DB , ${error}`)
    })
}

export default connectDB;