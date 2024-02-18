import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../locate.css";

export const FrontComputers = () => {
  const [data, setData] = useState([]);
  const [wall, SetWall] = useState([]);

  const autofetch = () => {
    // console.log("autofetch");
    axios
      .get("https://liblocate-server.onrender.com/pict0/frontComputers")
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://liblocate-server.onrender.com/pict0/frontWall")
      .then((res) => {
        SetWall(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    autofetch();
  }, []);

  const updateField = async (id) => {
    await axios
      .patch(
        `https://liblocate-server.onrender.com/pict0/frontComputers/${id}`,
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
  // updateWall

  const updateWall = async (id) => {
    await axios
      .patch(`https://liblocate-server.onrender.com/pict0/frontWall/${id}`, {
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
    <div className="centering" style={{ height: "80vh", width: "100vw" }}>
      <div
        style={{
          position: "relative",
          width: "80vw",
          height: "5vh",
          marginBottom: "5vh",
        }}
      >
        <Link to={"/locate"} className="btn btn-light lefty">
          Back to Locate
        </Link>
        <h1
          style={{ display: "inline-block", color: "white" }}
          className="fw-bold"
        >
          Front Computers
        </h1>
      </div>

      <div className="Front-Computer-Area">
        <div className="PCies">
          {data.map((val, index) => (
            <button
              className={`PC ${
                val.state === 1 ? "green-button" : "white-button"
              }`}
              key={index}
              title={val.user}
              onClick={() => {
                updateField(val._id);
              }}
            >
              🖥️
            </button>
          ))}
        </div>

        <div className="PCies-wall">
          {wall.map((val, index) => (
            <button
              className={`B buty ${
                val.state === 1 ? "green-button" : "white-button"
              }`}
              key={index}
              title={val.user}
              onClick={() => {
                updateWall(val._id);
              }}
            >
              🪑
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
