import express from "express";
import {  getBookings, postBookings } from "../controllers/bookings.controllers.js";


const router = express.Router();


router.get("", getBookings)
router.post("", postBookings)



export default router;
