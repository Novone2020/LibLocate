import "./navstyle.css";
import {Link,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import {useCookies} from "react-cookie";

export const Navbar=()=>{
    const [cookies, , removeCookie] = useCookies(["access_token"]);
    const [ourCookie, setOurCookie] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (cookies["access_token"]) {
          setOurCookie(true);
        } else {
          setOurCookie(false);
        }
      }, [cookies]);

      const logout = () => {
        removeCookie("access_token", { path: "/", domain: "liblocate-frontend.onrender.com" });
        localStorage.removeItem("userID");
        navigate("/login");
      };

    return(<>
        <center>
            <nav className="flexy navbar" style={{marginTop:"1vh"}}>
                <Link to="/" className="navbar-brand fw-bold whity">ShareZone</Link>
                <Link to="/locate" className="navbar-brand fw-bold whity">Locate</Link>
                
                {
                    !ourCookie?
                        (<>
                            {/* <Link to="/signup" className="navbar-brand fw-bold whity">Sign Up</Link> */}
                            <Link to="/login" className="navbar-brand fw-bold whity">Log In</Link>
                        </>)
                    :
                        (<>
                            <button className="btn btn-light fw-bold" onClick={logout}>Log Out</button>
                        </>)
                }
                    
            </nav>
        </center>

    </>)
}
