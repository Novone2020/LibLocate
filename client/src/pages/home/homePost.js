import {useParams,Link} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export const HomePost=()=>{
    const [post,setPost]=useState([]);

    const params=useParams();

    useEffect(()=>{
        // console.log("post useEffect");

        axios.post("http://localhost:3001/pict0/post",{postId:params.postId})
        .then((res)=>{
            // console.log(res.data);
            setPost(res.data);
        })
        .catch((err)=>{
            console.error(err);
        });
    },[params.postId])

    return(<>
    <center>
        <div className="click-post">
            <div>
                <Link to={"/"} className="btn btn-light lefty">Back to ShareZone</Link>
                <h1>{post.title}</h1>
            </div>
            
            <img src={post.image} alt={post.title + "image"} height={"60%"}/>
            <h3>{post.description}</h3>
        </div>
    </center>
    </>)
}