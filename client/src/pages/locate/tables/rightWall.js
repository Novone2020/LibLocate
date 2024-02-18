import "../locate.css";
import { CommonNav } from "../commonNav";
import { useEffect, useState } from "react";
import axios from "axios";

export const RightWall = () => {
  const [data, setData] = useState([]);

  const autofetch = () => {
    axios
      .get("https://liblocate-server.onrender.com/pict0/rightWall")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    autofetch();
  }, []);

  const updateRight = async (id) => {
    await axios
      .patch(`https://liblocate-server.onrender.com/pict0/rightWall/${id}`, {
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
      <div
        className="centering"
        style={{ height: "85vh", width: "100vw", marginTop: "1vh" }}
      >
        <CommonNav name="RIGHT WALL" />
        <div className="right-wall-rows">
          <div className="walls">
            <div className="r IN-wall">
              {data.map((info, index) => {
                if (info.area === "left") {
                  return (
                    <button
                      key={index}
                      className={`non-electirc-chairs buty ${
                        info.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.user}
                      onClick={() => {
                        updateRight(info._id);
                      }}
                    >
                      🪑
                    </button>
                  );
                } else return null;
              })}
            </div>
            <div className="g IN-wall">
              {data.map((info, index) => {
                if (info.area === "middle") {
                  return (
                    <button
                      key={index}
                      className={`non-electirc-chairs buty ${
                        info.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.user}
                      onClick={() => {
                        updateRight(info._id);
                      }}
                    >
                      🪑
                    </button>
                  );
                } else return null;
              })}
            </div>
            <div className="b IN-wall">
              {data.map((info, index) => {
                if (info.area === "right") {
                  return (
                    <button
                      key={index}
                      className={`non-electirc-chairs buty ${
                        info.state === 1 ? "green-button" : "white-button"
                      }`}
                      title={info.user}
                      onClick={() => {
                        updateRight(info._id);
                      }}
                    >
                      🪑
                    </button>
                  );
                } else return null;
              })}
            </div>
          </div>

          {/* INFO */}
          <div className="lower">
            <div className="r lower1">
              <h1>LEFT</h1>
            </div>

            <div className="g lower1">
              <h1>MIDDLE</h1>
            </div>

            <div className="b lower1">
              <h1>RIGHT</h1>
            </div>
          </div>
          {/* INFO */}
        </div>
      </div>
    </>
  );
};
