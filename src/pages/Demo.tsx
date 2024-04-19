
import {motion} from "framer-motion";
import { useEffect, useState } from "react";



var salesScript=[
  "Hello John,How are you doing today?",
  "I am doing great,Im actually reaching out to discuss about a cool sales product we're working on",
]



function Demo() {

  const [current, setcurrent] = useState("");
  const [next, setnext] = useState("");
  const [index, setindex] = useState(0);

  useEffect(() => {
    setcurrent(salesScript[index]);
    setnext(salesScript[index+1]);
  }, [index])

  return ( 
    <div className="h-full w-full flex justify-center items-center bg-black/80 text-white/90">
        <div style={{fontFamily:"Roboto"}} className="text-6xl font-medium tracking-tight flex flex-col justify-start items-start">
            {
              current.split(",").map((item, index1) => {
                  return(
                    <div className="flex flex-row justify-start items-center gap-4">
                      {
                        item.split(" ").map((word, index2) => {
                          return (
                            <motion.div
                              initial={{opacity:0}}
                              animate={{opacity:1}}
                              transition={{delay:(index1==0?1*0.5:index1+0.1)+index2*0.1}}
                            >
                              {word}
                              </motion.div>
                          )
                        })
                      }
                    </div>
                  )
              })
            }
        </div>

    </div>
   );
}

export default Demo;