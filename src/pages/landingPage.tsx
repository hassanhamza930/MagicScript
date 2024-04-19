import { NavBar } from "@/components/Navbar";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Timestamp, addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Feature from "./components/feature";
import card from '../../public/assets/card.svg';
import ai from "../../public/assets/openai.png";
import chat from "../../public/assets/chat.gif";
import { Ticket } from "@/interfaces";
import { LiaCommentSolid } from "react-icons/lia";
import { CiFileOn } from "react-icons/ci";
import { motion } from "framer-motion";



const demodata = [
  {
    id: "1",
    title: "Why should you start a startup",
    shortDescription: "The best way to get rich is to start a startup.",
    priority: "Medium",
  } as Ticket,
  {
    id: "3",
    title: "How to talk to users?",
    shortDescription: "Talking to users is the most essential step in building a product.",
    priority: "Medium",
  } as Ticket,
  {
    id: "4",
    title: "How to find a Co-founder?",
    shortDescription: "Finding a co-founder can be a pivotal step in your startup journey.",
    priority: "Low",
  } as Ticket,
  {
    id: "5",
    title: "How to get your first 10 customers",
    shortDescription: "Getting your first 10 customers is the hardest part of building a startup.",
    priority: "Low",
  } as Ticket,
]

function LandingPage() {


  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    addDoc(collection(db, "visits"), {
      visitTime: Timestamp.now()
    });

    document.querySelector('video')!.playbackRate = 1.3;

  }, [])



  return (
    <main id="no_scroll" className="w-full flex flex-col justify-start items-center relative pt-32 bg-[#222831]  px-5 md:px-0 ">
      {/* <div className="absolute top-0 z-[-2] h-full w-full bg-[#121212]  bg-[radial-gradient(#1e1e1e_1px,#121212_1px)] bg-[size:20px_20px]"></div> */}

      <NavBar />

      <div className="w-full flex flex-col justify-start items-center mt-12 md:mt-24 tracking-tight text-white/80 text-center">
        <div style={{ fontFamily: "Pacifico" }} className="gradient-text text-6xl  md:text-9xl tracking-tighter p-2 md:p-5">CourseCanvas</div>
        <div style={{ fontFamily: "Roboto" }} className="text-2xl md:text-3xl font-normal mt-2 opacity-80 tracking-tighter ">The Future of Knowledge is <span className="text-yellow-500 font-medium">Micro</span></div>
        <div style={{ fontFamily: "Roboto" }} className="text-sm md:text-md font-light mt-1 opacity-60 tracking-normal text-center hidden md:flex">Attention span is key and people don't watch 2 hour courses anymore,</div>
        <div style={{ fontFamily: "Roboto" }} className="text-sm md:text-md font-light mt-1 opacity-60 tracking-normal text-center"> CourseCanvas helps you build action focused Micro Courses with KanBan style boards</div>

        <div style={{ fontFamily: "Inter" }} className="flex flex-row justify-center items-center w-full gap-4 mt-5">
          <button onClick={() => { navigate("/earlyaccess") }} className="hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-20 mt-5 px-10 py-2 bg-blue-700 text-white/90 rounded-md text-sm">Early Access</button>
          <button onClick={() => { navigate("/demo") }} className="hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-200 mt-5 px-10 py-2 bg-white text-black/80 rounded-md text-sm flex flex-row justify-center items-center gap-2">
            Demo
            <ArrowRightIcon />
          </button>

        </div>

      </div>

      <motion.div
        id="no_scroll" className="relative w-full md:w-3/4 2xl:w-2/4 rounded-xl p-5 mt-10 flex flex-col justify-start items-center">

        <div className="w-full flex flex-wrap justify-center items-end gap-3">
          {
            demodata.map((item, index) => {
              var baseDelay = 0.3 * index;
              var baseDuration = 1 + (0.5 * index);

              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: baseDuration, delay: baseDelay }}
                  className="bg-white/90 w-96 rounded-md flex-col my-1 px-3 py-3 gap-1 flex justify-start items-center text-start text-black/80"
                >

                  <div className="flex justify-start items-start w-full mb-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: baseDuration + 0.2, delay: baseDelay + 0.2 }}
                      className={`px-4 py-1 text-[10px] ${item.priority == "Low" ? "bg-blue-600/10 text-blue-600" : item.priority == "Medium" ? "bg-yellow-500/10 text-yellow-500" : "bg-[#D20062]/10 text-[#D20062]"} rounded-sm`}>{item.priority}</motion.div>
                  </div>

                  <div className="flex flex-row justify-start items-center gap-3 h-full w-full">
                    {/* <RxHamburgerMenu size={15} fontSize={20} className="flex flex-none" /> */}

                    <button className="text-start flex flex-col justify-start items-start">

                      <div className="text-md tracking-tight hover:underline text-start font-medium flex flex-wrap justify-start items-start text-black/80 gap-1">
                        {
                          item.title.split(" ").map((word, index) => {
                            return (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: baseDuration + (0.2 * index), delay: baseDelay + (0.3 * index) }}
                                className="inline-block"
                              >{word}</motion.div>
                            )
                          })
                        }
                      </div>
                      <div className="text-sm tracking-tight font-medium text-black/60 flex flex-wrap justify-start items-start gap-1">
                        {
                          item.shortDescription.split(" ").map((word, index) => {
                            return (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: baseDuration + (0.2 * index), delay: baseDelay + (0.1 * index) }}
                                className="inline-block"
                              >{word}</motion.div>
                            )
                          })
                        }
                      </div>
                    </button>
                  </div>

                  <div className="flex flex-row justify-end items-center w-full gap-0 mt-1">
                    <LiaCommentSolid />

                    <div className="text-xs text-black/60 ml-1">1 Comment</div>
                    <CiFileOn className="ml-3" />
                    <div className="text-xs text-black/60 ml-1">1 Video</div>

                  </div>

                </motion.div>
              )
            })
          }
        </div>

        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent to-[#222831]"></div>

      </motion.div>

      <div className="w-full flex flex-col text-lg justify-start font-normal items-center tracking-tight text-white/80 mt-36 text-center">
        My Name's Hamza, and i'm an Indie Hacker from Lahore, <br className="md:flex hidden" /> trying to change how courses are made 🤍
      </div>

      <div className="w-full md:w-[70%] md:h-[50%] mt-10 rounded-xl md:rounded-3xl overflow-hidden shadow-xl shadow-yellow-600/50">
        <video poster={"/assets/thumbnail.png"} id="demo" src="/assets/demo.mp4" autoPlay loop controls className="h-full w-full" />
      </div>

      <div style={{ fontFamily: "Inter" }} className="text-3xl tracking-tight font-medium text-center text-white/80 mt-24">
        What's Different? <b className="text-yellow-500">Everything</b>
      </div>

      <div className="flex flex-wrap justify-center items-center mt-10 gap-2">
        <Feature image={ai} title="AI" description="Leverage AI to quickly scaffold, fill in with your expertise" />
        <Feature image={card} title="Micro" description="Courses are passive, Sell KanBan style action items instead" />
        <Feature image={chat} title="Support" description="Provide Targetted Support Exactly where your customers are stuck" />
        <div className="w-full h-0"></div>
        <Feature image={"https://i.pinimg.com/originals/7d/97/f8/7d97f84ae99be5a47c2014402029b29a.gif"} title="Sell" description="Traditional Platforms keep upto 80% of what you earn, Take control of your pricing" />
        <Feature image={"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/099f42108460795.5fbe3a2a322a6.gif"} title="Market" description="CourseCanvas automatically creates stunning marketing visuals for you" />
        <Feature image={"https://i.pinimg.com/originals/f8/8a/ca/f88acab7ffd127b4465659500aa0538f.gif"} title="Analyze" description="Keep track of course performance to figure out your audience and see what works" />
      </div>



      <button onClick={() => { window.open("https://www.termsfeed.com/live/3e45fccc-6d15-4736-a797-adb9df20160e") }} className="flex flex-row justify-center items-center gap-2 hover:scale-105 transiton-all duration-300 text-md font-regular mt-36 bg-white text-black px-5 py-2 rounded-md mb-16">
        Privacy Policy
        <ArrowRightIcon />
      </button>


      {/* <div className="py-36"></div> */}




    </main>
  );
}

export default LandingPage;
