import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {userModel} from "../models/googleusers.js";
import {normalUserModel} from "../models/users.js";

const app=express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Cross-Origin-Opener-Policy'],
    optionsSuccessStatus: 200
}));

const userAuthRouter=express.Router();

userAuthRouter.post("/addGoogleUser",async(req,res)=>{
    const user=req.body;
    // console.log(user);
    
    // {
    //     _id: '',
    //     email: '@gmail.com',
    //     username: 'novone',
    //     profilePic: ''    
    // }

    const profilePic=user.profilePic;
    const username=user.username;

    const search=await userModel.findOne({username});

    if(!search){
        const newUser=new userModel(user);
        const ok=await newUser.save();
    }

    const token=jwt.sign({id:user._id},"secret");
    res.json({token,userId:user._id,message:"Google Account Logged In !!"})
    
    // res.send({profilePic,username});
});

userAuthRouter.post("/addUser",async(req,res)=>{
    const {logUsername,logPass}=req.body;
    const search=await normalUserModel.findOne({username:logUsername});
    // console.log(logUsername,logPass);

    if(!search){
        const password=await bcrypt.hash(logPass,10);       //#hashing  10 is salt round 
        const newUser=new normalUserModel({username:logUsername,password});
        await newUser.save();

        res.json({message:"User Registered!!",success:true});
    }
    else{
        res.json({message:"User Exist!! Try Another Username or Sign IN with GOOGLE",success:false});
    }
})

userAuthRouter.post("/login",async(req,res)=>{
    const {logUsername,logPass}=req.body;

    const user=await normalUserModel.findOne({username:logUsername}); 
    // findOne because if we find() then it empty array even if their's nothing & our if condition won't work
    
    if(!user){
        return res.json({message:"User Doesn't exist!! Sign In",success:false});
    }

    const password=await bcrypt.compare(logPass,user.password);

    if(!password){
        return res.send({message:"Incorrect password !! Try Again !!",success:false});
    }

    const token=jwt.sign({id:user._id},"secret");
    res.json({token,userId:user._id,success:true});
})

export {userAuthRouter};
