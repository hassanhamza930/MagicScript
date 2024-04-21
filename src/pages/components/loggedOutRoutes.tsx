import { Route, Routes } from "react-router-dom";
import Demo from "../Demo";
import LandingPage from "../landingPage";

function LoggedOutRoutes() {
    return ( 
        <Routes>
            <Route path="/" element={<LandingPage/>} />
        </Routes>
     );
}

export default LoggedOutRoutes;