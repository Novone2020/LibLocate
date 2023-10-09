import express from "express";

import { NonElecTableModel } from "../../models/locateRightSection/nonElectricTable.js";
import { userModel } from "../../models/googleusers.js";

const  nonElecTableRouter= express.Router();

nonElecTableRouter.get("/nonElecTable",async(req,res)=>{
    const data=await NonElecTableModel.find({});
    return res.json(data);
})


// PATCH 

// *********************************TOP************************************
nonElecTableRouter.patch("/nonElecTable/top/:id",async(req,res)=>{
    const {id}=req.params;
    const user = req.body.user;

    try{
        const USER = await userModel.findById(user);
        const location = await NonElecTableModel.findById(id);
        const updatedState = location.top.state === 1 ? 0 : 1;

        if(USER.username!=location.top.user && location.top.user.length != 0) return res.json({success:false});
        const userDetail= updatedState? USER.username:"";

        const updatedDocument=await NonElecTableModel.findByIdAndUpdate(
        id,
        {
            $set: {
                top: 
                {
                    user: userDetail,
                    state: updatedState, 
                }
            }
        },
        { new: true } // To return the updated document
        );

        res.json({updatedDocument,done:true});
    }catch(err){
        res.json(err);
    }
})

// *********************************BOTTOM************************************
nonElecTableRouter.patch("/nonElecTable/bottom/:id",async(req,res)=>{
    const {id}=req.params;
    const user = req.body.user;

    try{
        const USER = await userModel.findById(user);
        const location = await NonElecTableModel.findById(id);
        const updatedState = location.bottom.state === 1 ? 0 : 1;

        if(USER.username!=location.bottom.user && location.bottom.user.length != 0) return res.json({success:false});
        const userDetail= updatedState? USER.username:"";

        const updatedDocument=await NonElecTableModel.findByIdAndUpdate(
        id,
        {
            $set: {
                bottom: 
                {
                    user: userDetail,
                    state: updatedState, 
                }
            }
        },
        { new: true } // To return the updated document
        );

        res.json({updatedDocument,done:true});
    }catch(err){
        res.json(err);
    }
})

// *********************************Right************************************
nonElecTableRouter.patch("/nonElecTable/right/:id",async(req,res)=>{
    const {id}=req.params;
    const user = req.body.user;

    try{
        const USER = await userModel.findById(user);
        const location = await NonElecTableModel.findById(id);
        const updatedState = location.right.state === 1 ? 0 : 1;

        if(USER.username!=location.right.user && location.right.user.length != 0) return res.json({success:false});
        const userDetail= updatedState? USER.username:"";

        const updatedDocument=await NonElecTableModel.findByIdAndUpdate(
        id,
        {
            $set: {
                right: 
                {
                    user: userDetail,
                    state: updatedState, 
                }
            }
        },
        { new: true } // To return the updated document
        );

        res.json({updatedDocument,done:true});
    }catch(err){
        res.json(err);
    }
})

// *********************************Left************************************
nonElecTableRouter.patch("/nonElecTable/left/:id",async(req,res)=>{
    const {id}=req.params;
    const user = req.body.user;

    try{
        const USER = await userModel.findById(user);
        const location = await NonElecTableModel.findById(id);
        const updatedState = location.left.state === 1 ? 0 : 1;

        if(USER.username!=location.left.user && location.left.user.length != 0) return res.json({success:false});
        const userDetail= updatedState? USER.username:"";

        const updatedDocument=await NonElecTableModel.findByIdAndUpdate(
        id,
        {
            $set: {
                left: 
                {
                    user: userDetail,
                    state: updatedState, 
                }
            }
        },
        { new: true } // To return the updated document
        );

        res.json({updatedDocument,done:true});
    }catch(err){
        res.json(err);
    }
})

export { nonElecTableRouter };