import { NavBar } from "@/components/Navbar";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Timestamp, addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHandleGoogleSignIn from "@/hooks/useGoogleSignin";
import { Button } from "@/components/ui/button";
import { Card, ContainerScroll } from "./components/containerScroll";
import demoQuick from "../../public/assets/demoQuick.mp4";
import { useScroll, useTransform } from "framer-motion";

function LandingPage() {


  const navigate = useNavigate();
  const db = getFirestore();
  const [intro, setintro] = useState(true);

  useEffect(() => {
    if (window.location.origin.includes("localhost") == false) {
      console.log("adding visit");
      addDoc(collection(db, "visits"), {
        visitTime: Timestamp.now()
      });
    }
  }, [])

  const { handleGoogleSignIn } = useHandleGoogleSignIn();
  const containerRef = useRef(null);

  const scaleDimensions = () => {
    return window.innerWidth < 1280 ? [0.7, 0.9] : [1.05, 1];
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const rotate = useTransform(scrollYProgress, [0, 2], [5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);


  return (
    <main id="no_scroll" className=" bg-contain bg-repeat w-full flex flex-col justify-start items-center relative bg-[#FBFBFB] overflow-x-hidden ">
      {/* <IntroAnimation/> */}
      {/* <AnimatePresence>
        {
          intro == true &&
          <div className="fixed z-[150] h-screen w-full flex justify-start items-center backdrop-blur-xl">
            <Intro setintro={setintro} />
          </div>
        }
      </AnimatePresence> */}

      <div className="h-full w-full flex flex-col justify-start items-center bg-[#FBFBFB]/60 px-5 pt-32">
        <NavBar />

        <div className="w-full flex flex-col justify-start items-center mt-12 md:mt-16 tracking-tight text-indigo-600 text-center">
          {/* <div style={{ fontFamily: "Pacifico" }} className="gradient-text text-8xl md:text-9xl tracking-tight px-5 pt-12 pb-20">Closey</div> */}
          <div style={{ fontFamily: "Inter" }} className="text-5xl md:text-6xl tracking-tight font-bold mt-24 md:leading-[50px] flex flex-col justify-center items-center text-center gap-0 md:gap-[2px]">World's First<span className="ml-1 bg-indigo-600 text-white px-4 md:py-3 md:mt-[4px]">Dynamic Sales Script</span>to Close 10x More Meetings</div>
          <div style={{ fontFamily: "Roboto" }} className="text-sm md:text-xl font-normal mt-5 tracking-normal text-center flex">Never search your notes for what to say, ever again.<br/>Closey is a node based scripting platform to map out all scenarios in advance<br className="md:flex hidden"/> and play them with a beautiful teleprompter </div>

          <div style={{ fontFamily: "Inter" }} className="flex flex-row justify-center items-center w-full gap-4 mt-5">
            <button onClick={() => { handleGoogleSignIn() }} className="hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-20 mt-5 px-10 py-2 bg-indigo-600 text-white/90 rounded-md text-sm">Get Started</button>
            <button onClick={() => { navigate("/demo") }} className="hidden md:flex hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-200 mt-5 px-10 py-2 bg-black/80 text-white rounded-md text-sm flex flex-row justify-center items-center gap-2">
              Demo
              <ArrowRightIcon />
            </button>

          </div>

        </div>


        {/* <video id="video" controls src="/assets/demo.mp4" className="relative flex w-full md:w-auto md:h-[550px] mt-24 rounded-xl bg-cover">

        </video> */}

        {/* <iframe className="w-full md:w-[850px] h-64 md:h-[550px] mt-24 rounded-xl shadow-2xl shadow-yellow-600/50" src="https://www.youtube.com/embed/uvF2U8h2lvE?si=N2eQM2tVtuFU2eba" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}

        <video src={demoQuick} className=" md:h-[550px] mt-16 md:mt-24 rounded-xl shadow-2xl shadow-yellow-600/50" controls={false} autoPlay={true} muted={true} loop={true}/>


        <div className="w-full flex flex-col text-lg justify-start font-normal items-center tracking-tight text-black/80 mt-24 text-center md:mb-16">

          A Sales Scripting Platform<br /> Made with love to make calls a breeze.
        </div>


        <ContainerScroll>
          <div
            ref={containerRef}
            style={{ fontFamily: "Inter" }} className="w-[850px] h-[550px] mt-0 rounded-md md:rounded-3xl overflow-hidden flex flex-none bg-transparent flex-row justify-start items-start shadow-2xl">

            <div className="flex justify-start items-start flex-col h-full w-64">
              <div style={{ backgroundImage: `url('https://salesgravy.com/wp-content/uploads/2021/04/cold-calling-approach.png')` }} className="h-3/4 w-64 bg-yellow-500 bg-center bg-cover">
                {/* <div className="h-full w-full bg-gradient-to-b from-transparent to-[#aefb2a]/80">
      </div> */}
              </div>
              <div className="h-1/4 w-64 bg-gradient-to-bl to-blue-600 from-indigo-600 text-white  bg-center bg-cover tracking-tighter">
                <div className="flex flex-col justify-center items-center gap-0 h-full w-full backdrop-blur-xl">
                  <div className="text-3xl font-semibold">
                    $10
                  </div>
                  <div className="text-sm font-normal opacity-70">
                    per month
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-start flex-wrap h-full w-full bg-transparent text-black/80">
              <div className="h-2/4 w-2/4 bg-indigo-600 flex flex-col justify-center items-center text-center tracking-tighter">
                <div className="h-full w-full text-white backdrop-blur-md flex flex-col justify-center items-center">
                  <span className="text-2xl font-medium">Teleprompter</span>
                  <span className="text-sm opacity-70">
                    Control the conversation by only seeing a few chunks of the script at a time, Navigate easily using the keyboard
                  </span>
                </div>
              </div>


              <div style={{ backgroundImage: `url('https://www.proglobalbusinesssolutions.com/wp-content/uploads/2023/07/cold-calling.webp')` }} className="h-2/4 w-2/4 bg-gradient-to-br bg-cover bg-left  flex flex-col justify-center items-center text-center px-5 tracking-tighter">

              </div>

              <div style={{ fontFamily: "Roboto" }} className="tracking-tight bg-cover bg-center h-2/4 w-full bg-gradient-to-br from-indigo-600 to-blue-600 flex flex-col justify-center items-center text-center">

                <div className="h-full w-full flex-col flex justify-center items-centerbackdrop-blur-xl text-white">
                  <span className="text-6xl font-semibold tracking-tight py-2 px-2">Pivot Easily</span>
                  <span className="text-md opacity-70 font-medium">Don't look up what to say on a call,<br /> Just press a key and pivot the script in runtime</span>
                </div>
              </div>

            </div>

          </div>
        </ContainerScroll>


        <div className="flex flex-col w-full mt-10 md:mt-48 justify-start items-center text-black/80">
          <div className="text-3xl font-bold ">Features</div>
          <div className="text-sm font-normal text-center px-5">We're working very hard to improve the product on a daily basis,<br className="md:flex hidden" /> Signup now to avail early bird pricing and get all future features for free</div>

          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mt-10">

            <div className="flex flex-col justify-start items-start w-full md:w-96 h-40 p-4 border-2 border-black/40 rounded-md">
              {/* <div className="text-[10px] font-normal bg-black px-4 py-1 rounded-full text-white">ETA: 1 Week</div> */}
              <div className="text-xl font-medium mt-2">Pivot</div>
              <div className="text-sm font-normal">Don't look up what to say on a call, press a button to pivot the script and handle all counters gracefully</div>
            </div>

            <div className="flex flex-col justify-start items-start w-full md:w-96 h-40 p-4 border-2 border-black/40 rounded-md">
              {/* <div className="text-[10px] font-normal bg-black px-4 py-1 rounded-full text-white">ETA: 2 Weeks</div> */}
              <div className="text-xl font-medium mt-2">Shortcuts</div>
              <div className="text-sm font-normal">Don't mess up your script by writing tons of notes, Create custom shortcuts to handle the most common objections with ease</div>
            </div>

            <div className="flex flex-col justify-start items-start w-full md:w-96 h-40 p-4 border-2 border-black/40 rounded-md">
              {/* <div className="text-[10px] font-normal bg-black px-4 py-1 rounded-full text-white">ETA: 4 Weeks</div> */}
              <div className="text-xl font-medium mt-2">Analytics</div>
              <div className="text-sm font-normal">Sales is a business of scale, figure out exactly where customers are dropping off by analyzing most common script flow patterns to improve continuously</div>
            </div>



          </div>

        </div>



        <div style={{ fontFamily: "Inter" }} className="flex flex-col justify-start items-center gap-2 tracking-tighter mt-48 my-24">
          <div className="text-4xl font-medium text-center">Ready to supercharge your sales calls?</div>
          <Button onClick={() => { handleGoogleSignIn() }} className="bg-black/80 text-white px-24 mt-5">Let's Go</Button>
        </div>


      </div>


    </main>

  );
}

export default LandingPage;
