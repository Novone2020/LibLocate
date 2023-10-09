import express from "express";

import { tableWallModel } from "../../models/locateRightSection/tableWall.js";
import {userModel} from "../../models/googleusers.js"; 

const tableWallRouter = express.Router();

tableWallRouter.get("/tableWall",async(req,res)=>{
    const data=await tableWallModel.find({});
    return res.json(data);
})

// ******************************************************************

tableWallRouter.patch("/tableWall/:id", async (req, res) => {
    const { id } = req.params;
    const user = req.body.user;
  
    try {
      const USER = await userModel.findById(user);
      const location = await tableWallModel.findById(id);
  
      // Toggle state between 0 and 1
      const updatedState = location.state === 1 ? 0 : 1;
  
      if(USER.username!=location.user && location.user.length != 0)
      {
        return res.json({success:false});
      }
  
      const userDetail= updatedState? USER.username:"";
  
      // Update only state and user fields, preserve other fields
      await tableWallModel.findByIdAndUpdate(
        id,
        {
          $set: {
            state: updatedState,
            user: userDetail
            // Add other fields here if needed
          }
        },
        { new: true } // To return the updated document
      );
  
      res.json({ done: true});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

export { tableWallRouter };