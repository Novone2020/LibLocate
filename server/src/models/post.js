import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    account:{
        type:String,
        required:true
    }
},{versionKey:false,timestamps:true});

export const postModel= mongoose.model("posts",postSchema);