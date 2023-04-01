import express from "express";
import {  deltePlacesByID,getPlaces,getPlacesByID,postPlaces,userPlaces,putPlaces } from "../controllers/places.controllers.js";


const router = express.Router();

router.get('',getPlaces)
router.post('',postPlaces)
router.put('',putPlaces)
router.get('/user',userPlaces);
router.get('/:id',getPlacesByID);
router.post('/:id',deltePlacesByID)
export default router;





