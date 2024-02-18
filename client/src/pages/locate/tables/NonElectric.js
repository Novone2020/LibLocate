import { useState, useEffect } from "react";
import axios from "axios";

import { CommonNav } from "../commonNav";
import "../locate.css";

export const NonElectric = () => {
  const [data, setData] = useState([]);
  const [wall, setWall] = useState([]);

  const autofetch = () => {
    axios
      .get("https://liblocate-server.onrender.com/pict0/nonElecTable")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("https://liblocate-server.onrender.com/pict0/smallWall")
      .then((res) => {
        setWall(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    autofetch();
  }, []);

  const updateTable = async (id, section) => {
    // console.log({id,section});
    await axios
      .patch(
        `https://liblocate-server.onrender.com/pict0/nonElecTable/${section}/${id}`,
        { user: localStorage.userID }
      )
      .then((res) => {
        if (res.data.done) autofetch();
        else {
          alert("unauthorized user modifying!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSmallWall = async (id) => {
    await axios
      .patch(`https://liblocate-server.onrender.com/pict0/smallWall/${id}`, {
        user: localStorage.userID,
      })
      .then((res) => {
        if (res.data.done) autofetch();
        else {
          alert("unauthorized user modifying!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="centering" style={{ height: "87vh", width: "100vw" }}>
        <CommonNav name="NON ELECTRIC TABLES" />

        <div className="nonELEC-area-out">
          <div className="Lblue nonELEC-area">
            {data.map((info, index) => {
              if (info.area === "blue") {
                return (
                  <div className="elec-table" key={index}>
                    <button
                      className={`R elec-but ${
                        info.right.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.right.user}
                      onClick={() => {
                        updateTable(info._id, "right");
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`T elec-but ${
                        info.top.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.top.user}
                      onClick={() => {
                        updateTable(info._id, "top");
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`L elec-but ${
                        info.left.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.left.user}
                      onClick={() => {
                        updateTable(info._id, "left");
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`D elec-but ${
                        info.bottom.state === 1
                          ? "green-button"
                          : "white-button"
                      }`}
                      title={info.bottom.user}
                      onClick={() => {
                        updateTable(info._id, "bottom");
                      }}
                    >
                      🪑
                    </button>

                    <div className="middle-box"></div>
                  </div>
                );
              } else return null;
            })}
          </div>

          {/* INFO PART */}
          <div className="nonELEC-area-info">
            <div className="info-up centering">
              <h1>UPPER PART</h1>
            </div>
            <div className="info-down centering">
              <h1>LOWER PART</h1>
            </div>
          </div>
          {/* INFO PART */}

          <div className="Lgreen nonELEC-area">
            {/* <div className="elec-table"> */}

            {data.map((info, index) => {
              if (info.area === "green") {
                return (
                  <div className="elec-table" key={index}>
                    <button
                      className={`R elec-but ${
                        info.right.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.right.user}
                      onClick={() => {
                        updateTable(info._id, "right");
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`T elec-but ${
                        info.top.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.top.user}
                      onClick={() => {
                        updateTable(info._id, "top");
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`L elec-but ${
                        info.left.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.left.user}
                      onClick={() => {
                        updateTable(info._id, "left");
                      }}
                    >
                      🪑
                    </button>

                    <button
                      className={`D elec-but ${
                        info.bottom.state === 1
                          ? "green-button"
                          : "white-button"
                      }`}
                      title={info.bottom.user}
                      onClick={() => {
                        updateTable(info._id, "bottom");
                      }}
                    >
                      🪑
                    </button>

                    <div className="middle-box"></div>
                  </div>
                );
              } else return null;
            })}

            <div className="p25">
              <div className="front-row">
                {wall.map((data, index) => {
                  return (
                    <button
                      className={`fr buty ${
                        data.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={data.user}
                      key={index}
                      onClick={() => {
                        updateSmallWall(data._id);
                      }}
                    >
                      🪑
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
