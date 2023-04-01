import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT;

console.log(jwtSecret)

export const signin = async(req,res)=>{

    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.status(404).json('user not found');
    }
}

export const register = async(req,res)=>{

    const {name,email,password} = req.body;

    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) 
    {
      res.status(422).json(e);
    }
  
}

export const googleAuth = async(req,res)=>{

    const {name,email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) 
    {
  
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).status(200).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } 
    
    else 
    {
  
      try {
        const userDoc = await User.create({
          name,
          email,
          password:bcrypt.hashSync(password, bcryptSalt),
        });
  
  
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
          jwt.sign({
            email:userDoc.email,
            id:userDoc._id
          }, jwtSecret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).status(200).json(userDoc);
          });
        } else {
          res.status(422).json('pass not ok');
        }
  
  
      } catch (e) 
      {
  
        res.status(422).json(e);
      }
    }
}
export const profile = async(req,res)=>{


    const {token} = req.cookies;
    if (token) 
    {
    
      jwt.verify(token, jwtSecret, {}, async (err, userData) => 
      {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
  
      });
  
    } else 
    {
      res.json(null);
    }
}

export const logout =(req,res)=>{
    res.cookie('token', '').json(true);
}