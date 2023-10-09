import mongoose from "mongoose";

const tableWallSchema=new mongoose.Schema({
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

export const tableWallModel=mongoose.model("tablewalls",tableWallSchema);