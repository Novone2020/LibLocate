import axios from "axios";
import jwt_decode from "jwt-decode";

import { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // googleLogout not used
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./auth.css";

const client_Id = process.env.REACT_APP_ClientId;
const googleApi = process.env.REACT_APP_googleApi;
const login = process.env.REACT_APP_normalLog;

export const Login = () => {
  const [logUsername] = useState("");
  const [logPass] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const [ready, setReady] = useState(false);

  const navigate = useNavigate();
  const user = false;

  useEffect(() => {
    axios
      .get("https://liblocate-server.onrender.com/ping")
      .then((res) => {
        console.log(res.data.ready);
        setReady(res.data.ready);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logSubmit = async (e) => {
    e.preventDefault();

    const user = {
      logUsername,
      logPass,
    };

    await axios
      .post(`https://liblocate-server.onrender.com/${login}`, user)
      .then((res) => {
        setCookies("access_token", res.data.token, {
          path: "/",
          domain: "liblocate-frontend.onrender.com",
        });
        window.localStorage.setItem("userID", res.data.userId);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  };

  const signed = async (res) => {
    const decoded = await jwt_decode(res.credential);
    // console.log(decoded);
    const user = {
      _id: decoded.sub,
      email: decoded.email,
      username: decoded.name,
      profilePic: decoded.picture,
    };

    await axios
      .post(`https://liblocate-server.onrender.com/${googleApi}`, user)
      .then((res) => {
        setCookies("access_token", res.data.token, {
          path: "/",
          domain: "liblocate-frontend.onrender.com",
        });
        window.localStorage.setItem("userID", res.data.userId);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div
      className="w-50 mx-auto p-5 mt-4 border shadow"
      style={{
        background:
          "linear-gradient(rgba(220,220,255,0.4) 85%, rgba(255,255,255,0.5) 100%)",
      }}
    >
      <GoogleOAuthProvider clientId={client_Id}>
        <h1 className="fw-bold">Log In</h1>
        <form onSubmit={logSubmit}>
          {user ? (
            <div>Logged In</div>
          ) : (
            <div className="mt-3 ">
              <center>
                <GoogleLogin
                  onSuccess={(res) => {
                    signed(res);
                  }}
                  onError={() => console.log("GOOGLE Error")}
                />
              </center>
            </div>
          )}
          <hr />
          {ready ? (
            <>
              <h4 className="fw-bold">
                Functionality are limited to Gmail only.
              </h4>
              <button className="btn btn-success fw-bold">
                Server Running
              </button>
            </>
          ) : (
            <>
              <h4 className="fw-bold">Server is not running yet</h4>
              <button className="btn btn-danger fw-bold">
                Wake up the Server
              </button>
            </>
          )}
        </form>
      </GoogleOAuthProvider>
    </div>
  );
};

// 2:26:18 (Logout Functionality)  => https://youtu.be/CcBHZ0t2Qwc?t=8778
// 1:55;28 (Google Sign) => https://youtu.be/CcBHZ0t2Qwc?t=6928

/*          GOOGLE Sign In

            <div className="mt-5">
                {
                    user?(
                        <div>Logged In</div>
                    ):(
                        <center>
                            <GoogleLogin
                                onSuccess={(res)=>{
                                    signed(res);
                                }}
                                onError={()=>{console.log("Error Occured")}}
                            />
                        </center>
                    )
                }
            </div> 
*/
