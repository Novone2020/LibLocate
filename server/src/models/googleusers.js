import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    _id:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        reuired:false
    },
    username:{
        type:String,
        reuired:false
    },
    profilePic:{
        type:String,
        default:"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
        reuired:false
    }
},{versionKey:false,timestamps:true});

export const userModel=mongoose.model("googleusers",userSchema);