import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js'
import newUser from './routes/newUser.route.js'

const app = express();
dotenv.config()

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongo database")
    }catch(err){
        console.log(err)
    }
}
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:3000",credentials:true}))

app.use('/api/auth',authRoute)
app.use('/api/user',newUser)

app.listen(process.env.PORT, ()=>{
    connect();
    console.log("Backend server is running on port no", process.env.PORT)
})