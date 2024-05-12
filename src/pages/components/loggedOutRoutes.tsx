import { Route, Routes } from "react-router-dom";
import Demo from "../Demo";
import LandingPage from "../landingPage";
import Play from "../play";

function LoggedOutRoutes() {
    return (
        <div className="h-full w-full">
            {
                // window.innerWidth < 1280 ?
                false?
                    <div className='fixed z-10 h-screen w-full bg-black/90 backdrop-blur-sm flex justify-center items-center'>
                        <div className='bg-gradient-to-br from-[#57ebde] to-[#aefb2a] h-96 w-4/5 md:h-96 md:w-96 rounded-2xl overflow-hidden'>
                            <div className="bg-yellow-300/60 h-full w-full flex flex-col justify-center items-center tracking-tight text-center p-5 text-black/80">
                                <div className="text-3xl font-medium">Desktop Only 🙁 </div>
                                <div className="text-sm font-normal">MagicScript is designed to run on Desktop and be controlled via the keyboard, while you hold the phone in the other hand</div>
                                <div className="text-sm font-normal mt-10">Please visit on Desktop to start using</div>
                            </div>
                        </div>
                    </div> :
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/demo" element={<Play isDemo={true}  />} />
                    </Routes>
            }

        </div>
    );
}

export default LoggedOutRoutes;