

import jwt from "jsonwebtoken";
import BookingModel from "../models/Booking.js";


const jwtSecret = '7078069303';

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => 
    {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
  });
  }


export const getBookings =async(req,res)=>{
    const userData = await getUserDataFromReq(req);
    res.json( await BookingModel.find({user:userData.id}).populate('place') );
}

export const postBookings = async(req,res)=>{


    const userData = await getUserDataFromReq(req);
    try{
        const {
            place,checkIn,checkOut,numberOfGuests,name,phone,price,
          } = req.body;
          BookingModel.create({
            place,checkIn,checkOut,numberOfGuests,name,phone,price,
            user:userData.id,
          }).then((doc) => {
            res.json(doc);
          }).catch((err) => {
            throw err;
          });
    }
    catch(err)
    {
console.log(err);
    }

}

