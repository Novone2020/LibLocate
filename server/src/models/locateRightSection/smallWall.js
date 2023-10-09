import mongoose from "mongoose";

const smallWallSchema=new mongoose.Schema({
    state:{
        type:Number
    },
    user:{
        type:String
    }
});

export const smallWallModel=mongoose.model("smallwalls",smallWallSchema);