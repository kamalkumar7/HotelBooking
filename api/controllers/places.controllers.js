
import jwt from "jsonwebtoken";
import BookingModel from "../models/Booking.js";
import Place from '../models/Place.js'
import dotenv from 'dotenv'

dotenv.config();
const jwtSecret = process.env.JWT;


export const getPlaces = async(req,res)=>{
    res.json( await Place.find() );

}

export const getPlacesByID = async(req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
}

export const deltePlacesByID = async (req,res)=>{

    try {
        const id = req.params.id;
        const plc = await Place.findById(id);
        const ress = await BookingModel.findOneAndDelete({place : plc });
        await Place.findByIdAndDelete(id);
        res.json("place deleted")
    } catch (error) {
        console.log(error);
        res.json("err");
    }
    

}

export const postPlaces = async(req,res)=>{
    const {token} = req.cookies;
    const {
      title,address,addedPhotos,description,price,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner:userData.id,price,
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,
      });
      res.json(placeDoc);
    });

}


export const userPlaces = async(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const {id} = userData;
      res.json( await Place.find({owner:id}) );
    });

}

export const putPlaces = async(req,res)=>{

    const {token} = req.cookies;
    const {
      id, title,address,addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,address,photos:addedPhotos,description,
          perks,extraInfo,checkIn,checkOut,maxGuests,price,
        });
        await placeDoc.save();
        res.json('ok');
      }
    });
}



