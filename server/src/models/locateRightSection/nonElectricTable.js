import mongoose from "mongoose";

const NonElecTableSchema=new mongoose.Schema({
    area:{
        type:String
    },
    right:{
        user:{type:String},
        state:{type:Number}
    },
    left:{
        user:{type:String},
        state:{type:Number} 
    },
    top:{
        user:{type:String},
        state:{type:Number} 
    },
    bottom:{
        user:{type:String},
        state:{type:Number}
    }
});

export const NonElecTableModel=mongoose.model("nonelectables",NonElecTableSchema);