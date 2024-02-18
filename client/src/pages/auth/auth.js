import axios from "axios";
import jwt_decode from "jwt-decode";

import { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // googleLogout not used
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./auth.css";

const client_Id = process.env.REACT_APP_ClientId;
const googleApi = process.env.REACT_APP_googleApi;
const normalApi = process.env.REACT_APP_normalApi;
const login = process.env.REACT_APP_normalLog;

export const Login = () => {
  const [logUsername, ] = useState("");
  const [logPass, ] = useState("");
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
        setCookies("access_token", res.data.token, { path: "/", domain: "localhost" })
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
      username: decoded.displayName,
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
          {/* <br/>
                <input 
                    type="text" className="form-control" 
                    placeholder="Username"
                    onChange={(e)=>setLogUsername(e.target.value)} 
                    ref={ref}
                />
                
                <br/>

                <input 
                    type="password" className="form-control" 
                    placeholder="Password"
                    onChange={(e)=>setLogPass(e.target.value)}
                />

                <br/>

                <button className="btn btn-primary fw-bold" type="submit">Login</button>

                <br/>
                <br/>
                <hr/> */}

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
          {/* <p style={{color:"black",fontSize:"2vh"}} className="fw-bold" >NEW HERE ??</p> */}
          <h3 className="fw-bold">
            For Now Functionality are limited to Gmail Id only
          </h3>
          {/* <Link to={"/signup"} className="btn btn-info fw-bold">Sign UP</Link> */}
        </form>
      </GoogleOAuthProvider>
    </div>
  );
};

// ******************************************* Sign UP ********************************************** //

export const SignUP = () => {
  const [logUsername, setLogUsername] = useState("");
  const [logPass, setLogPass] = useState("");
  const [, setCookies] = useCookies(["access_token"]);

  const user = false;
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (ref.current) {
      ref.current?.focus();
    }
  }, [ref]);

  const formsubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`https://liblocate-server.onrender.com/${normalApi}`, {
        logUsername,
        logPass,
      })
      .then((res) => {
        if (res.data.success === true) {
          alert(res.data.message + " Login Now !! Redirecting... ");
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signed = async (res) => {
    const decoded = await jwt_decode(res.credential);
    const user = {
      _id: decoded.sub,
      email: decoded.email,
      username: decoded.given_name,
      profilePic: decoded.picture,
    };

    await axios
      .post(`https://liblocate-server.onrender.com/${googleApi}`, user)
      .then((res) => {
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
    <div className="page-body w-50 mx-auto p-5 mt-4 border shadow">
      <GoogleOAuthProvider clientId={client_Id}>
        <h1 className="fw-bold">Sign Up</h1>

        <form onSubmit={formsubmit}>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(e) => setLogUsername(e.target.value)}
            ref={ref}
          />
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setLogPass(e.target.value)}
          />
          <br />
          <button className="btn btn-primary" type="submit">
            Sign UP
          </button>
          <br />
          <br />
          <hr />

          <div className="mt-3">
            {user ? (
              <div>Logged In</div>
            ) : (
              <center>
                <GoogleLogin
                  onSuccess={(res) => {
                    signed(res);
                  }}
                  onError={() => {
                    console.log("Error Occured");
                  }}
                />
              </center>
            )}
          </div>

          <br />
          <br />

          <span style={{ color: "black", fontSize: "3vh" }} className="fw-bold">
            Wanna Login➡
            <Link to={"/login"} className="btn btn-info mx-2 fw-bold">
              Log In
            </Link>
          </span>
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
