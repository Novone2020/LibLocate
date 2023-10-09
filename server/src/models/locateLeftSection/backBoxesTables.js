import mongoose from  "mongoose";

const backBoxesTablesSchema=new mongoose.Schema({
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

export const backboxesTablesModel=mongoose.model("backboxestables",backBoxesTablesSchema);