import { useState, useEffect } from "react";
import axios from "axios";
import { CommonNav } from "../commonNav.js";

export const BoxesBack = () => {
    const [data, setData] = useState([]);
        const [table,setTable] = useState([]);
    
        const autofetch=()=>{
            axios.get("http://localhost:3001/pict0/backboxes")
            .then((res) => {
                setData(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    
            axios.get("http://localhost:3001/pict0/backBoxesTables")
            .then((res)=>{
                setTable(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    
        useEffect(() => {
            autofetch();
        }, [])
    
        const updateField=async(id)=>{
            await axios.patch(`http://localhost:3001/pict0/backboxes/${id}`,{user:localStorage.userID})
            .then((res)=>{
              if(res.data.done) autofetch();
              else {
                alert("unauthorized user modifying!!");
              }
            })
            .catch((err)=>{
              console.log(err);
            })
        }
    
        // ********************************TABLE modifications********************************
    
        const updateRight=async(id)=>{
            await axios.patch(`http://localhost:3001/pict0/backBoxesTables/right/${id}`,{user:localStorage.userID})
            .then((res)=>{
              if(res.data.done) autofetch();
              else {
                alert("unauthorized user modifying!!");
              }
            })
            .catch((err)=>{
              console.log(err);
            })
        }
    
        const updateLeft=async(id)=>{
            await axios.patch(`http://localhost:3001/pict0/backBoxesTables/left/${id}`,{user:localStorage.userID})
            .then((res)=>{
              if(res.data.done) autofetch();
              else {
                alert("unauthorized user modifying!!");
              }
            })
            .catch((err)=>{
              console.log(err);
            })
        }
    
        const updateTop=async(id)=>{
            await axios.patch(`http://localhost:3001/pict0/backBoxesTables/top/${id}`,{user:localStorage.userID})
            .then((res)=>{
              if(res.data.done) autofetch();
              else {
                alert("unauthorized user modifying!!");
              }
            })
            .catch((err)=>{
              console.log(err);
            })
        }
    
        const updateBottom=async(id)=>{
            await axios.patch(`http://localhost:3001/pict0/backBoxesTables/bottom/${id}`,{user:localStorage.userID})
            .then((res)=>{
              if(res.data.done) autofetch();
              else {
                alert("unauthorized user modifying!!");
              }
            })
            .catch((err)=>{
              console.log(err);
            })
        }

  return (
    <>
      <div className="centering" style={{ height: "89vh", width: "100vw" }}>
        <CommonNav name="BACK BOXES" />

        <div className="back-boxes">
          <div className="back-boxes-left-section">
            <div className="back-boxes-top">
              {data &&
                data.map((info, index) => {
                  if (info.area === "top") {
                    return (
                      <button
                        key={`top-${index}`}
                        className={`ok back-wall-but ${
                          info.state === 1 ? "green-button" : "white-button"
                        }`}
                        title={info.user}
                        onClick={() => {
                          updateField(info._id);
                        }}
                      >
                        🪑
                      </button>
                    );
                  }
                  return null;
                })}
            </div>

            <div className="back-boxes-left">
              {data &&
                data.map((info, index) => {
                  if (info.area === "left") {
                    return (
                      <button
                        key={`left-${index}`}
                        className={`ok1 back-wall-but ${
                          info.state === 1 ? "green-button" : "white-button"
                        }`}
                        title={info.user}
                        onClick={() => {
                          updateField(info._id);
                        }}
                      >
                        🪑
                      </button>
                    );
                  }
                  return null;
                })}
            </div>

            <div className="back-boxes-center">
              {table.map((data, index) => {
                return (
                  <div className="single-table" key={`table-${index}`}>
                    <button
                      className={`right1 chair 
                                                ${
                                                  data.right.state === 1
                                                    ? "green-button"
                                                    : "white-button"
                                                }`}
                      title={data.right.user}
                      onClick={() => {
                        updateRight(data._id);
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`top1 chair 
                                                ${
                                                  data.top.state === 1
                                                    ? "green-button"
                                                    : "white-button"
                                                }`}
                      title={data.top.user}
                      onClick={() => {
                        updateTop(data._id);
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`left1 chair 
                                                ${
                                                  data.left.state === 1
                                                    ? "green-button"
                                                    : "white-button"
                                                }`}
                      title={data.left.user}
                      onClick={() => {
                        updateLeft(data._id);
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`bottom1 chair 
                                                ${
                                                  data.bottom.state === 1
                                                    ? "green-button"
                                                    : "white-button"
                                                }`}
                      title={data.bottom.user}
                      onClick={() => {
                        updateBottom(data._id);
                      }}
                    >
                      🪑
                    </button>

                    <div className="center-table"></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="back-boxes-right-section">
            {data &&
              data.map((info, index) => {
                if (info.area === "right") {
                  return (
                    <button
                      key={`right-${index}`}
                      className={`back-wall-but ${
                        info.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.user}
                      onClick={() => {
                        updateField(info._id);
                      }}
                    >
                      🪑
                    </button>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </>
  );
};
