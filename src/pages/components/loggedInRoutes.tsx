import { Route, Routes } from "react-router-dom";
import Demo from "../Demo";
import LoggedInNavBar from "./loggedInNavbar";
import Scripts from "../scripts";
import NewScript from "../newScript";
import Play from "../play";
import EditScript from "../editScript";
import License from "../license";
import Feedback from "../feedback";

function LoggedInRoutes() {
    return (
        <>
        {
            window.innerWidth<1280?
            <div className='fixed z-10 h-screen w-full bg-black/80 backdrop-blur-sm flex justify-center items-center'>
                        <div className='bg-gradient-to-br from-[#57ebde] to-[#aefb2a] h-96 w-4/5 md:h-96 md:w-96 rounded-2xl overflow-hidden'>
                            <div className="bg-yellow-300/60 h-full w-full flex flex-col justify-center items-center tracking-tight text-center p-5 text-black/80">
                                <div className="text-3xl font-medium">Desktop Only 🙁 </div>
                                <div className="text-sm font-normal">MagicScript looks best on desktop and is designed to be used with the phone in the other hand.</div>
                                <div className="text-sm font-normal mt-10">Please visit on Desktop to start using</div>
                                <div className="text-sm font-bold">https://magicscript.vercel.app</div>
                            </div>
                        </div>
                    </div>:
                    <div className="relative flex justify-start flex-row items-center h-full w-full bg-black/80">
            <LoggedInNavBar />
            <div className="relative w-full h-full flex justify-start items-start">
                <Routes>
                    <Route path="/" element={<Scripts />} />
                    <Route path="/newscript" element={<NewScript />} />
                    <Route path="/edit/:scriptid" element={<EditScript />} />
                    <Route path="/play/:scriptid" element={<Play />} />
                    <Route path="/license" element={<License />} />
                    <Route path="/feedback" element={<Feedback />} />
                </Routes>
            </div>
        </div>
        }
        </>
       
    );
}

export default LoggedInRoutes;