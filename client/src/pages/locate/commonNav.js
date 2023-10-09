import {Link} from "react-router-dom";
import "./locate.css";

export const CommonNav=(props)=>{
    return(<>
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

                <h1 style={{ display: "inline-block", color: "white" }} className="fw-bold">
                    {props.name}
                </h1>
            </div>
        </div>
    </>)
};