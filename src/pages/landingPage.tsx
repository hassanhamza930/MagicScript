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

    document.querySelector('video')!.playbackRate = 1.3;
  }, [])

  const { handleGoogleSignIn } = useHandleGoogleSignIn();


  return (
    <main id="no_scroll" className="w-full flex flex-col justify-start items-center relative pt-32 bg-[#222831]  px-5 md:px-0 ">
      {/* <div className="absolute top-0 z-[-2] h-full w-full bg-[#121212]  bg-[radial-gradient(#1e1e1e_1px,#121212_1px)] bg-[size:20px_20px]"></div> */}

      <NavBar />

      <div className="w-full flex flex-col justify-start items-center mt-12 md:mt-24 tracking-tight text-white/80 text-center">
        <div style={{ fontFamily: "Pacifico" }} className="gradient-text text-6xl  md:text-9xl tracking-tighter p-24">MagicScript</div>
        <div style={{ fontFamily: "Roboto" }} className="text-2xl md:text-3xl font-normal mt-2 opacity-80 tracking-tighter ">Sound<span className="text-yellow-500 font-medium ml-1">100x more Confident</span></div>
        <div style={{ fontFamily: "Roboto" }} className="text-sm md:text-xl font-normal mt-1 opacity-60 tracking-normal text-center hidden md:flex">Never go Blank on another sales call, ever again.<br /> Stay on point, Pivot Easily and close more deals</div>

        <div style={{ fontFamily: "Inter" }} className="flex flex-row justify-center items-center w-full gap-4 mt-5">
          <button onClick={() => { handleGoogleSignIn() }} className="hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-20 mt-5 px-10 py-2 bg-blue-700 text-white/90 rounded-md text-sm">Get Access</button>
          <button onClick={() => { navigate("/demo") }} className="hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-200 mt-5 px-10 py-2 bg-white text-black/80 rounded-md text-sm flex flex-row justify-center items-center gap-2">
            Demo
            <ArrowRightIcon />
          </button>

        </div>

      </div>


      <div style={{ backgroundImage: `url('${demogif}')` }} className="relative flex h-[550px] w-2/4 mt-24 rounded-xl bg-cover">
          <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent to-[#222831]">

          </div>
      </div>

      <div className="w-full flex flex-col text-lg justify-start font-normal items-center tracking-tight text-white/80 mt-36 text-center">
        My Name's Hamza, and i'm an Indie Hacker from Lahore, <br className="md:flex hidden" /> trying to change how courses are made 🤍
      </div>

      <div className="w-full md:w-[70%] md:h-[50%] mt-10 rounded-xl md:rounded-3xl overflow-hidden shadow-xl shadow-yellow-600/50">
        <video poster={"/assets/thumbnail.png"} id="demo" src="/assets/demo.mp4" autoPlay loop controls className="h-full w-full" />
      </div>

      <div style={{ fontFamily: "Inter" }} className="text-3xl tracking-tight font-medium text-center text-white/80 mt-24">
        The Only <b className="text-yellow-500">Cold Call Tool</b> You will ever need.
      </div>




      <button onClick={() => { window.open("https://www.termsfeed.com/live/3e45fccc-6d15-4736-a797-adb9df20160e") }} className="flex flex-row justify-center items-center gap-2 hover:scale-105 transiton-all duration-300 text-md font-regular mt-36 bg-white text-black px-5 py-2 rounded-md mb-16">
        Privacy Policy
        <ArrowRightIcon />
      </button>




    </main>
  );
}

export default LandingPage;
