import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import bookingRoutes from './routes/bookings.routes.js'
import uploadRoutes from './routes/upload.routes.js'
import placesRoutes from './routes/places.routes.js'


import dotenv from 'dotenv'
dotenv.config();
const app = express();

app.listen(4000,()=>{
  console.log("Server Started");
});
app.use(cors(
  {
      origin: 'http://localhost:5173',
      credentials: true,
  }
));




app.use(express.json());
app.use(cookieParser());





mongoose.set('strictQuery', false);


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Database Connected"));

app.use('/api/auth',authRoutes);

app.use('/api/bookings',bookingRoutes);

app.use('/api/upload',uploadRoutes);

app.use('/api/places',placesRoutes);

app.use('/hi',()=>{
  console.log(process.env.JWT)
})





























// app.post('/api/rate', async(req,res)=>{
//   mongoose.connect(process.env.MONGO_URL);
//   const idd = "6426ef4c79739559dd837864";
//   // const userData = await getUserDataFromReq(req);
    
//     const placeData= await Place.findByIdAndUpdate(idd, { rating: ratings.length+1 }, { new: true })
//     // console.log( placeData);
  
//   res.json(placeData).status(200);
  
// })
