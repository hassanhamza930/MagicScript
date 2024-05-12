import { indexAtom } from "@/atoms/atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";


function Intro(props:{setintro:any}) {
    const [index, setindex] = useRecoilState(indexAtom);
    const [salesScript, setsalesScript] = useState<Array<{text:string}>>(
        [
            {
                text:"Welcome, We're glad you're here"
            },
            {
                text:"Closey, is a teleprompter specifically designed for sales folks to make cold calls a breeze"
            },
            {
                text:"Sound 100x More Confident, Stay on Point, Pivot Easily, and close more deals."
            },
            {
                text:"Let's Explore"
            },
        ] as Array<{text:string}>
        );
    


    function MoveForward(index:number){
        if (index+1 >= salesScript.length) {
            props.setintro(false);
            return;
        }
        else{
            setindex(index+1);
        }

        setTimeout(()=>{
         MoveForward(index+1)  
        },2500)
    }
   
    useEffect(()=>{
        setindex(0)
        setTimeout(()=>{
            MoveForward(0);
        },2500)

    },[])


    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ transition: 0.7 }}
            className="relative h-full w-full flex justify-start items-center bg-[#124076] text-[#DFF5FF] overflow-y-hidden">
            

            <div style={{ fontFamily: "Roboto" }} className="overflow-hidden md:text-6xl font-medium tracking-tight flex flex-col h-full justify-center items-start w-full">
                <div className="w-full md:w-3/5 flex flex-col justify-start items-start h-min md:h-[20%] px-5 md:ml-24">
                    <div className="flex flex-col justify-start items-start gap-4">

                        {
                            salesScript[index]?.text.split(",").map((line, index1) => {
                                return (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 * index1 }}
                                        key={line} style={{ fontSize: line.length > 20 ? 32 : window.innerWidth<1280?48:64, fontWeight: line.length > 20 ? 400 : 600 }} className={`flex tracking-normal flex-wrap h-min w-full justify-start items-start ${line.length > 20 ? "gap-x-2" : "gap-x-2"} `}>
                                        {
                                            line.trim().split(" ").map((word, index2) => {
                                                return (
                                                    <motion.div 
                                                    initial={{opacity:0}}
                                                    animate={{opacity:1}}
                                                    transition={{duration:0.4,delay:0.1*(index1+index2)}}
                                                    key={word} >
                                                        {word}
                                                    </motion.div>
                                                )
                                            })
                                        }
                                    </motion.div>
                                )
                            })
                        }
                        
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-row justify-start items-center gap-4 mt-36 text-3xl font-normal text-[#FFFAE6]/40 w-full tracking-tight">
                        {salesScript[index + 1]?.text}
                    </motion.div>

                </div>

            </div>



        </motion.div>
    );
}

export default Intro;