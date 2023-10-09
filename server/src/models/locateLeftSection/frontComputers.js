import mongoose from "mongoose";

const FrontSchema=new mongoose.Schema({
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

export const locateModel=mongoose.model("frontcomputers",FrontSchema);