import { Link } from "react-router-dom";
import axios from "axios";

import "../locate.css";
import { useEffect, useState } from "react";

export const BackWall = () => {
  const [data, setData] = useState([]);

  const autofetch = () => {
    axios
      .get("https://liblocate-server.onrender.com/pict0/tableWall")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.err(err);
      });
  };

  useEffect(() => {
    autofetch();
  }, []);

  const updateWall = async (id) => {
    await axios
      .patch(`https://liblocate-server.onrender.com/pict0/tableWall/${id}`, {
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
      <div className="centering" style={{ height: "80vh", width: "100vw" }}>
        <div className="boxex-center">
          <div
            style={{
              position: "relative",
              width: "80vw",
              height: "8vh",
              marginBottom: "2vh",
            }}
          >
            <Link to={"/locate"} className="btn btn-light lefty">
              Back to Locate
            </Link>

            <h1
              style={{ display: "inline-block", color: "white" }}
              className="fw-bold"
            >
              TABLES BACK WALL
            </h1>
          </div>
        </div>

        <div className="table-back-wall">
          <div className="upper-wall">
            {data.map((info, index) => {
              if (info.area === "up") {
                return (
                  <>
                    <button
                      key={index}
                      className={`back-wall-but ${
                        info.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.user}
                      onClick={() => {
                        updateWall(info._id);
                      }}
                    >
                      🪑
                    </button>
                  </>
                );
              } else return null;
            })}
          </div>

          <div className="lower-wall">
            {data.map((info, index) => {
              if (info.area === "down") {
                return (
                  <>
                    <button
                      key={index}
                      className={`back-wall-but ${
                        info.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.user}
                      onClick={() => {
                        updateWall(info._id);
                      }}
                    >
                      🪑
                    </button>
                  </>
                );
              } else return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
