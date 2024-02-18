import axios from "axios";
import jwt_decode from "jwt-decode";

import { useState, useRef, useEffect } from "react";
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

  const navigate = useNavigate();
  const ref = useRef(null);
  const user = false;

  useEffect(() => {
    if (ref.current) {
      return ref.current?.focus();
    }
  }, [ref]);

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
          domain: "localhost",
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
    console.log(decoded);
    const user = {
      _id: decoded.sub,
      email: decoded.email,
      username: decoded.name,
      profilePic: decoded.picture,
    };

    await axios
      .post(`https://liblocate-server.onrender.com/${googleApi}`, user)
      .then((res) => {
        console.log(res);
        setCookies("access_token", res.data.token, {
          path: "/",
          domain: "localhost",
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

          <br />
          <h3 className="fw-bold">
            For Now Functionality are limited to Gmail Id only
          </h3>
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
