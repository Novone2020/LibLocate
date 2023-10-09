import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    versionKey:false,
    timestamps:true
});

export const normalUserModel=mongoose.model("users",userSchema);