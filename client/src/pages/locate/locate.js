import {useNavigate} from "react-router-dom";
import "./locate.css";

export const Locate=()=>{
    const navigate=useNavigate();

    return(<>
        <div className="main-section">

            {/* LEFT */}
            <div className="section">

                <div className="left-back" onClick={()=>{
                    return navigate("/boxes/BoxesBack")
                }}>
                    <h1>BOXES BACK</h1>
                </div>

                <div className="left-boxes" onClick={()=>{
                    return navigate("/boxes/Boxes")
                }}>
                    <h1>BOXES</h1>
                </div>

                <div className="left-front" onClick={()=>{
                    return navigate("/boxes/FrontComputers")
                }}>
                    <h1>FRONT COMPUTERS</h1>
                </div>

            </div>
            {/* LEFT */}
            



            {/* Right */}
            <div className="section">

                <div className="right-up" onClick={()=>{
                    return navigate("/tables/BackWall")
                }}>
                    <h1>Tables Back WALL</h1>
                </div>

                <div className="right-down-section">

                    <div className="right-table" onClick={()=>{
                    return navigate("/tables/NonElectric")
                    }}>
                        <h1>Non Electicity TABLES</h1>
                    </div>

                    <div className="right-wall" onClick={()=>{
                    return navigate("/tables/RightWall");
                    }}>
                        <h1>RIGHT</h1><h1> WALL</h1>
                    </div>

                </div>
            </div>
            {/* Right */}

        </div>
    </>)
}