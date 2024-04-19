
import { indexAtom } from "@/atoms/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { KeyboardEvent } from "react"; // Add missing import statement
import { Script } from "vm";




interface ScriptLine {
  text: string,
  pivot?: boolean,
  newMessages?: Array<ScriptLine>
}

var salesScriptDefault = [
  {
    text: "Hello,am i talking to John?",
    pivot: true,
    newMessages: [
      {
        text: "I Apologize for the confusion,Have a nice day"
      }
    ]
  },
  {
    text: "Hey there John,How are you doing my man?",
  },
  {
    text: "My name's Hamza,I'm a Sales Rep @ SalesFlow,I was hoping we could have a chat,Is this a good time?",
    pivot: true,
    newMessages: [
      {
        text: "My Bad,would you like me to call you later?",
        pivot: true,
        newMessages: [
          {
            text: "No Worries Man,Have a great day!"
          }
        ]
      },
      {
        text: "Wonderful,Talk later man,cyaa!"
      },
    ]
  },
  {
    text: "Great,Im actually reaching out to discuss about a cool sales product we're working on,I think it will be a game changer for your industry,If you have a minute i can explain how",
    pivot: true,
    newMessages: [
      {
        text: "Would you like me to contact you later?",
        pivot: true,
        newMessages: [
          {
            text: "I understand,No worries,Have a great day!"
          }
        ]
      },
      {
        text: "Wonderful,Talk later man,Take care!"
      }
    ]
  },
  {
    text: "Cool,So our product is a sales teleprompter that allows your sales teams,to always stay on point during cold calls,Sound confident and close more sales,Does this sound like something you'd be interested in?",
    pivot: false,
  }
] as Array<ScriptLine>







function Demo() {

  const [index, setindex] = useRecoilState(indexAtom);
  const [salesScript, setsalesScript] = useState<Array<ScriptLine>>(salesScriptDefault);

  const escFunction = (event: any) => {
    if (event.key === "ArrowDown") {
      if((index+2)>salesScript.length){
      }
      else{
        setindex(index + 1);
      }
    }
    else if (event.key === "ArrowUp") { // Use strict equality (===)
      if ((index - 1) < 0) {
        setindex(0);
      }
      else {
        setindex(index - 1);
      }
    }
    else if (event.key === "ArrowRight") { // Use strict equality (===)
      if(salesScript[index]?.pivot==true){
        var newMessages=salesScript[index]?.newMessages ?? [];
        setsalesScript([...newMessages]);
        setindex(0);
      }
      
    }


  };

  useEffect(() => {
    document.removeEventListener("keyup", escFunction);

    document.addEventListener("keyup", escFunction);
    return () => {
      document.removeEventListener("keyup", escFunction);
    };
  }, [index,salesScript]);


  return (
    <div className="h-full w-full flex justify-center items-center bg-black/80 text-white/90 overflow-y-hidden">
      <div className="h-full absolute z-10 flex flex-col justify-start items-start py-10 w-3/5 text-sm">
        <div className="flex flex-row justify-between items-center w-48"> <b>Next</b> Arrow Down </div>
        <div className="flex flex-row justify-between items-center w-48"> <b>Previous</b> Arrow Up </div>
        <div className="flex flex-row justify-between items-center w-48"> <b>Pivot</b> Arrow Right </div>
      </div>

      <div style={{ fontFamily: "Roboto" }} className="md:text-6xl font-medium tracking-tight flex flex-col h-full justify-center items-center w-full">
        <div className="w-3/5 flex flex-col justify-start items-start h-[20%]">
          <div className="flex flex-col justify-start items-start gap-4">
           
            {
              salesScript[index]?.text.split(",").map((line, index1) => {
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 * index1 }}
                    key={line} style={{ fontSize: line.length > 20 ? 32 : 64, fontWeight: line.length > 20 ? 400 : 600 }} className={`flex flex-wrap justify-start items-center ${line.length > 20 ? "gap-x-2" : "gap-x-4"} `}>
                    {
                      line.split(" ").map((word, index2) => {
                        return (
                          <div key={word} >
                            {word}
                          </div>
                        )
                      })
                    }
                  </motion.div>
                )
              })
            }
             {
              salesScript[index]?.pivot==true&&
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm px-4 py-1 rounded-full bg-white/90 text-black/80 tracking-normal mt-10">Pivot Available</motion.div>
            }
            {
              index+1==salesScript.length&&
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm px-4 py-1 rounded-full bg-yellow-400 text-black/80 tracking-normal mt-10">End of Call</motion.div>
            }
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-row justify-start items-center gap-4 mt-48 text-3xl font-normal text-white/30 tracking-tight">
            {salesScript[index + 1]?.text}
          </motion.div>

        </div>

      </div>



    </div>
  );
}

export default Demo;