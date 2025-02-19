import { NavBar } from "@/components/Navbar";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Timestamp, addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Feature from "./components/feature";
import card from '../../public/assets/card.svg';
import ai from "../../public/assets/openai.png";
import chat from "../../public/assets/chat.gif";
import { LiaCommentSolid } from "react-icons/lia";
import { CiFileOn } from "react-icons/ci";
import { motion } from "framer-motion";
import demogif from "../../public/assets/demogif.gif";
import useHandleGoogleSignIn from "@/hooks/useGoogleSignin";


function LandingPage() {


  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    addDoc(collection(db, "visits"), {
      visitTime: Timestamp.now()
    });

    // document.querySelector('video')!.playbackRate = 1.3;
  }, [])

  const { handleGoogleSignIn } = useHandleGoogleSignIn();


  return (
    <main id="no_scroll" className="w-full flex flex-col justify-start items-center relative pt-32 bg-[#FBFBFB]  px-5 md:px-0 ">
      <NavBar />

      <div className="w-full flex flex-col justify-start items-center mt-12 md:mt-16 tracking-tight text-black/90 text-center">
        <div style={{ fontFamily: "Pacifico" }} className="gradient-text text-8xl tracking-tighter p-24 py-16">MagicScript</div>
        <div style={{ fontFamily: "Inter" }} className="text-2xl md:text-3xl mt-2 opacity-80 tracking-tight font-bold ">Sound<span className="italic underline ml-1">100x more Confident</span></div>
        <div style={{ fontFamily: "Roboto" }} className="text-sm md:text-xl font-normal mt-1 opacity-60 tracking-normal text-center hidden md:flex">Never go Blank on another sales call, ever again.<br /> Stay on point, Pivot Easily and close more deals</div>

        <div style={{ fontFamily: "Inter" }} className="flex flex-row justify-center items-center w-full gap-4 mt-5">
          <button onClick={() => { handleGoogleSignIn() }} className="hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-20 mt-5 px-10 py-2 bg-blue-700 text-white/90 rounded-md text-sm">Get Access</button>
          <button onClick={() => { navigate("/demo") }} className="hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-200 mt-5 px-10 py-2 bg-black/80 text-white rounded-md text-sm flex flex-row justify-center items-center gap-2">
            Demo
            <ArrowRightIcon />
          </button>

        </div>

      </div>


      <div style={{ backgroundImage: `url('${demogif}')` }} className="relative flex h-[550px] w-3/4 mt-24 rounded-xl bg-cover">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent">

        </div>
      </div>

      <div className="w-full flex flex-col text-2xl justify-start font-normal items-center tracking-tight text-black/80 mt-36 text-center">
        The only cold call tool, you will ever need.<br />
        Made with love, to make your life easier.
      </div>

      <div style={{fontFamily:"Inter"}} className="w-[850px] h-[550px] mt-10 rounded-md md:rounded-3xl overflow-hidden flex flex-none bg-transparent flex-row justify-start items-start">
        
        <div className="flex justify-start items-start flex-col h-full w-64">
          <div style={{ backgroundImage: `url('https://img.freepik.com/free-photo/woman-working-call-center-office_23-2149256080.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712880000&semt=ais')` }} className="h-3/4 w-64 bg-yellow-500 bg-center bg-cover">
            <div className="h-full w-full bg-gradient-to-b from-transparent to-[#ddd6f3]/80">
            </div>
          </div>
          <div className="h-1/4 w-64 bg-black/5 text-black/80 bg-center bg-cover tracking-tighter">
            <div className="flex flex-col justify-center items-center gap-0 h-full w-full">
              <div className="text-4xl font-bold">
                $10
              </div>
              <div className="text-xl font-normal">
                Lifetime Access
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col h-full w-full bg-transparent text-black/80">
          <div className="h-2/4 w-2/4 bg-gradient-to-br from-[#ddd6f3] to-[#faaca8] flex flex-col justify-center items-center text-center px-5 tracking-tighter">
              <span className="text-2xl font-medium">Pivot Easily</span>
              <span className="text-sm opacity-70">Don't look up what to say on a call, Just press a key and pivot the script in runtime</span>
          </div>
        </div>


      </div>

      <div style={{ fontFamily: "Inter" }} className="text-3xl tracking-tight font-medium text-center text-white/80 mt-24">
        The Only <b className="text-yellow-500">Cold Call Tool</b> You will ever need.
      </div>








    </main>
  );
}

export default LandingPage;
