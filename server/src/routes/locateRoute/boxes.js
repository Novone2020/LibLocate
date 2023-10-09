import express from "express";

const app=express();
app.use(express.json());

import {boxesModel} from "../../models/locateLeftSection/boxes.js";
import {userModel} from "../../models/googleusers.js";

const boxesRouter = express.Router();

boxesRouter.get("/boxes",async(req,res)=>{
    const data= await boxesModel.find({});
    res.json(data);
})

// ************************ BOXES RIGHT *********************************
boxesRouter.patch("/boxes/right/:id", async(req, res) => {
    const { id } = req.params;
    const user = req.body.user;
    const index = req.body.ind;

    try{
        const USER = await userModel.findById(user);
        const locate = await boxesModel.findById(id);
        const location = locate.right[index];

        const updatedState = location.state === 1 ? 0 : 1;

        if (USER.username !== location.user && location.user.length !== 0) {
            return res.json({ success: false, message: 'Unauthorized operation' });
        }

        const userDetail = updatedState ? USER.username : '';

        await boxesModel.findOneAndUpdate(
            { "_id": id },
            { $set: { [`right.${index}.state`]: updatedState, [`right.${index}.user`]: userDetail } },
            { new: true }
          )
            .then(updatedObject => {
                if (updatedObject) {
                res.json({done:true});
                } else {
                res.status(404).json({ error: 'Object not found' ,done:false});
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error',done:false });
            });
    }catch(err){
        console.log(err);
    }
})
// ************************ BOXES RIGHT *********************************

// ************************ BOXES LEFT **********************************

boxesRouter.patch("/boxes/left/:id", async(req, res) => {
    const { id } = req.params;
    const user = req.body.user;
    const index = req.body.ind;

    try{
        const USER = await userModel.findById(user);
        const locate = await boxesModel.findById(id);
        const location = locate.left[index];

        const updatedState = location.state === 1 ? 0 : 1;

        if (USER.username !== location.user && location.user.length !== 0) {
            return res.json({ success: false, message: 'Unauthorized operation' });
        }

        const userDetail = updatedState ? USER.username : '';

        await boxesModel.findOneAndUpdate(
            { "_id": id },
            { $set: { [`left.${index}.state`]: updatedState, [`left.${index}.user`]: userDetail } },
            { new: true }
          )
            .then(updatedObject => {
                if (updatedObject) {
                res.json({done:true});
                } else {
                res.status(404).json({ error: 'Object not found' ,done:false});
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error',done:false });
            });
    }catch(err){
        console.log(err);
    }
})

// ************************ BOXES LEFT *********************************

export { boxesRouter };