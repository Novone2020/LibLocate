import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import {useState,useEffect} from "react";
import Cookies from "js-cookie";

// pages
import { Login } from "./pages/auth/auth";
// import { SignUP } from "./pages/auth/auth"; // removed

import { Home } from "./pages/home/home";
import { Locate } from './pages/locate/locate';
import { HomePost } from "./pages/home/homePost";

// Locate pages

// Boxes
import {Boxes} from "./pages/locate/boxes/boxes";
import {BoxesBack} from "./pages/locate/boxes/boxesBack";
import {FrontComputers} from "./pages/locate/boxes/frontComputers";

// Tables
import {NonElectric} from "./pages/locate/tables/NonElectric";
import {BackWall} from "./pages/locate/tables/backWall";
import {RightWall} from "./pages/locate/tables/rightWall";

// components
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>

            <Routes>

              <Route path='/' element={ <Home/>}/>
              <Route path='/login' element={<Login/>}/>
              {/* <Route path='/signup' element={<SignUP/>}/> */}
              <Route path='/locate' element={ <Locate/>}/>
              <Route path='/post/:postId' element={ <HomePost/>}/>

              {/* Boxes */}
              <Route path='/boxes/Boxes' element={ <Boxes/>}/>
              <Route path='/boxes/BoxesBack' element={ <BoxesBack/>}/>
              <Route path='/boxes/FrontComputers' element={ <FrontComputers/>}/>
              {/* Boxes */}

              {/* Tables */}
              <Route path='/tables/NonElectric' element={ <NonElectric/>}/>
              <Route path='/tables/BackWall' element={ <BackWall/>}/>
              <Route path='/tables/RightWall' element={ <RightWall/>}/>
              {/* Tables */}

            </Routes>

        </Router>
    </div>
  );
}

const ProtectedRoute = ({ children, ...rest }) => {
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
      if (!Cookies.get("access_token")) {
        setIsUnauthorized(true);
      }
  }, []);

  if (isUnauthorized) {
    return <Navigate to="/login" />
  }

  return children;
};

export default App;
