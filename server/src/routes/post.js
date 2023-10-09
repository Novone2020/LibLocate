import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

import { postModel } from "../models/post.js";

const postRouter = express.Router();

postRouter.get("/getPost", async (req, res) => {
    try {
      const postData = await postModel.find({}); // Exclude image data for now
      return res.status(200).json({ success: true, data: postData });
    } 
    catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

postRouter.post("/createPost",async(req,res)=>{
    const data=req.body;
    const Post=new postModel({...data});

    try{
      await Post.save();
      res.json({message:"Post created"});
    }catch(err){
      console.error(err);
    }
})

postRouter.post("/post",async(req,res)=>{
    const postId=req.body.postId;

    try{
      const data=await postModel.findById(postId);
      return res.json(data);

    }catch(err){
      console.log(err);
    }
});
  
export { postRouter };
