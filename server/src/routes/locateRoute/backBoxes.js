import express from "express";

const app=express();
app.use(express.json());

import {backBoxesModel} from "../../models/locateLeftSection/backBoxes.js";
import {userModel} from "../../models/googleusers.js";

const backBoxesRouter = express.Router();

backBoxesRouter.get("/backboxes",async(req,res)=>{
    const data= await backBoxesModel.find({});
    res.json(data);
})

// ************************************************************************
backBoxesRouter.patch("/backboxes/:id", async (req, res) => {
    const { id } = req.params;
    const user = req.body.user;
  
    try {
      const USER = await userModel.findById(user);
      const location = await backBoxesModel.findById(id);
  
      // Toggle state between 0 and 1
      const updatedState = location.state === 1 ? 0 : 1;
  
      if(USER.username!=location.user && location.user.length != 0)
      {
        return res.json({success:false});
      }
  
      const userDetail= updatedState? USER.username:"";
  
      // Update only state and user fields, preserve other fields
      await backBoxesModel.findByIdAndUpdate(
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

export { backBoxesRouter };