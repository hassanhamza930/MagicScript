import { Route, Routes } from "react-router-dom";
import Demo from "../Demo";
import LoggedInNavBar from "./loggedInNavbar";
import Scripts from "../scripts";
import NewScript from "../newScript";

function LoggedInRoutes() {
    return (
        <div className="flex justify-start flex-row items-center h-full w-full bg-black/80">
            <LoggedInNavBar />
            <div className="w-full h-full flex justify-start items-start">
                <Routes>
                    <Route path="/" element={<Scripts />} />
                    <Route path="/newscript" element={<NewScript />} />
                </Routes>
            </div>
        </div>
    );
}

export default LoggedInRoutes;