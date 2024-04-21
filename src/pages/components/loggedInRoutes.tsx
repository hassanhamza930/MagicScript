import { Route, Routes } from "react-router-dom";
import Demo from "../Demo";

function LoggedInRoutes() {
    return ( 
        <Routes>
            <Route path="/" element={<Demo />} />
        </Routes>
     );
}

export default LoggedInRoutes;