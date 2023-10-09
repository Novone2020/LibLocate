import express from "express";

import { rightWallModel } from "../../models/locateRightSection/rightWall.js";
import { smallWallModel } from "../../models/locateRightSection/smallWall.js"
import { userModel } from "../../models/googleusers.js";

const rightWallRouter = express.Router();

rightWallRouter.get("/rightWall",async(req,res)=>{
    const data=await rightWallModel.find({});
    return res.json(data);
})

rightWallRouter.get("/smallWall",async(req,res)=>{
    const data=await smallWallModel.find({});
    return res.json(data);
})

// *****************************Small Wall (in table section)*******************

rightWallRouter.patch("/smallWall/:id",async(req,res)=>{
    const { id } = req.params;
    const user = req.body.user;

    try {
        const USER = await userModel.findById(user);
        const location = await smallWallModel.findById(id);

        // Toggle state between 0 and 1
        const updatedState = location.state === 1 ? 0 : 1;

        if(USER.username!=location.user && location.user.length != 0)
        {
        return res.json({success:false});
        }

        const userDetail= updatedState? USER.username:"";

        // Update only state and user fields, preserve other fields
        await smallWallModel.findByIdAndUpdate(
        id,
        {
            $set: {
            state: updatedState,
            user: userDetail
            // Add other fields here if needed
            }
        },
        { new: true } // To return the updated document
        );

        res.json({ done: true});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// *****************************RightWall***************************************

rightWallRouter.patch("/rightWall/:id",async(req,res)=>{
    const { id } = req.params;
    const user = req.body.user;

    try {
        const USER = await userModel.findById(user);
        const location = await rightWallModel.findById(id);

        // Toggle state between 0 and 1
        const updatedState = location.state === 1 ? 0 : 1;

        if(USER.username!=location.user && location.user.length != 0)
        {
        return res.json({success:false});
        }

        const userDetail= updatedState? USER.username:"";

        // Update only state and user fields, preserve other fields
        await rightWallModel.findByIdAndUpdate(
        id,
        {
            $set: {
            state: updatedState,
            user: userDetail
            // Add other fields here if needed
            }
        },
        { new: true } // To return the updated document
        );

        res.json({ done: true});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export { rightWallRouter };