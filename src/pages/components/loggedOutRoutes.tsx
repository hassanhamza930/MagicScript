import { Route, Routes } from "react-router-dom";
import Demo from "../Demo";
import LandingPage from "../landingPage";

function LoggedOutRoutes() {
    return ( 
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/demo" element={<Demo/>} />
        </Routes>
     );
}

export default LoggedOutRoutes;