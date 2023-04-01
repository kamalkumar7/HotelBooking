import express from "express";
import {  signin, register , googleAuth, profile,logout} from "../controllers/auth.controllers.js";


const router = express.Router();


router.post("/register", register)
router.post("/login", signin)
router.post("/gauth", googleAuth)
router.get("/profile", profile)
router.post("/logout", logout)


export default router;
