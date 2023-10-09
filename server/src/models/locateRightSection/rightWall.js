import mongoose from "mongoose";

const rightWallSchema=new mongoose.Schema({
    area:{
        type:String,
    },
    state:{
        type:Number,
    },
    user:{
        type:String
    }
});

export const rightWallModel=mongoose.model("rightwalls",rightWallSchema);