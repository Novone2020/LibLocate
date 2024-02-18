import express from "express";
import jwt from "jsonwebtoken";

import {userModel} from "../models/googleusers.js";

const userAuthRouter=express.Router();

userAuthRouter.post("/addGoogleUser",async(req,res)=>{
    const user=req.body;
    const profilePic=user.profilePic;
    const username=user.username;

    const search=await userModel.findOne({username});

    if(!search){
        const newUser=new userModel(user);
        const ok=await newUser.save();
    }

    const token=jwt.sign({id:user._id},"secret");
    res.json({token,userId:user._id,message:"Google Account Logged In !!"})
});

export {userAuthRouter};
