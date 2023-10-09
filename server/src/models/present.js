import mongoose from "mongoose";

const activeSchema=new mongoose.Schema({
    user:{
        type:String,
    }
},{versionKey:false,timestamps:true})

export const activeModel=mongoose.model("actives",activeSchema);