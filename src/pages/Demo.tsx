
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
    text: "Hello There, am i talking to John?",
    pivot: true,
    newMessages: [
      {
        text: "I Apologize for the confusion,Have a nice day"
      }
    ]
  },
  {
    text: "Hey there John, How are you doing my man?",
  },
  {
    text: "My name's Hamza,I'm a Sales Rep @ MagicScript, I was hoping we could have a chat, Is this a bad time?",
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
    text: "Wonderful, i actually wanted to have a chat about the proposal i sent you last week regarding MagicScript for your organization, have you had the chance to look at it?",
    pivot: true,
    newMessages: [
      {
        text: "No worries man, I can give you a quick TLDR",
      },
      {
        text: "I Basically tried to explain how our Product, MagicScript can supercharge your sales team by making them more confident during cold calls and making sure the conversation stays on track, Does this sound like something that you would be interested in buying for your company?",
        pivot: true,
        newMessages: [
          {
            text: "Yes, I can understand price can be an issue especially since you are going to be onboarding a team of around 30 people right?",
          },
          {
            text: "Let's do this John, How about we onboard your team for a 1 Month Free Trial, you can experiment and see if this would be a good fit for you guys, How does that sound?",
          },
          {
            text: "Wonderful John, i would like to book a call on your calendar for next tuesday 4PM, Does that work for you?",
          },
          {
            text: "Great, I'll send you a meeting invite on your email",
          },
          {
            text: "Really Excited to show you the product John, i'm positive once the team starts seeing the exponential increase in productivity, it will be much easier to see the additional value the product brings to the business",
          },
          {
            text: "Any questions before we drop off?",
          },
          {
            text: "(Answer Questions Here)",
          },
          {
            text: "Alright John, Talk to you Tuesday, Have a great day Bbye!",
          },
        ]
      },
      {
        text: "Awesome Man, I would like to book our first demo call for next tuesday, does that work for you?",
        pivot: false,
      },
      {
        text: "Wonderful, I'll send you a google meet invite on your email so you can add it to your calendar",
        pivot: false,
      },
      {
        text: "I'm Really excited to show you the product and how it can supercharge your sales team, let me know if you have any questions?",
        pivot: false,
      },
      {
        text: "(Answer Questions Here)",
        pivot: false,
      },
      {
        text: "Alright John, see you on Tuesday, Take care, Bbye!",
        pivot: false,
      },
    ]
  },
  {
    text: "Cool, So like you would have already seen, our product is a sales teleprompter that allows your sales teams,to supercharge their cold calls,Sound confident and close more deals,Does this sound like something you'd be interested in buying for your company?",
    pivot: true,
    newMessages: [
      {
        text: "Yes, I can understand price can be an issue especially since you are going to be onboarding a team of around 30 people right?",
        pivot: true,
      },
      {
        text: "Let's do this John, How about we onboard your team for a 1 Month Free Trial, you can experiment and see if this would be a good fit for you guys, How does that sound?",
        pivot: true,
      },
      {
        text: "Wonderful John, i would like to book a call on your calendar for next tuesday 4PM, Does that work for you?",
        pivot: true,
      },
      {
        text: "Great, I'll send you a meeting invite on your email",
        pivot: true,
      },
      {
        text: "Really Excited to show you the product John, i'm positive once the team starts seeing the exponential increase in productivity, it will be much easier to see the additional value the product brings to the business",
        pivot: true,
      },
      {
        text: "Any questions before we drop off?",
        pivot: true,
      },
      {
        text: "(Answer Questions Here)",
        pivot: true,
      },
      {
        text: "Alright John, Talk to you Tuesday, Have a great day Bbye!",
        pivot: true,
      },
    ]
  },
  {
    text: "Awesome Man, I would like to book our first demo call for next tuesday, does that work for you?",
    pivot: false,
  },
  {
    text: "Wonderful, I'll send you a google meet invite on your email so you can add it to your calendar",
    pivot: false,
  },
  {
    text: "I'm Really excited to show you the product and how it can supercharge your sales team, let me know if you have any questions?",
    pivot: false,
  },
  {
    text: "(Answer Questions Here)",
    pivot: false,
  },
  {
    text: "Alright John, see you on Tuesday, Take care, Bbye!",
    pivot: false,
  },
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
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ transition: 0.7 }}
            className="h-full w-full flex justify-start items-center bg-gradient-to-b from-gray-50/80 to-gray-200/80 text-black/80 overflow-y-hidden pl-36">
            
            <div className="h-full absolute z-10 flex flex-col justify-start items-start py-10 ml-24 text-sm">
                <div className="flex flex-row justify-between items-center w-48"> <b>Next</b> Arrow Down </div>
                <div className="flex flex-row justify-between items-center w-48"> <b>Previous</b> Arrow Up </div>
                <div className="flex flex-row justify-between items-center w-48"> <b>Pivot</b> Arrow Right </div>
            </div>

            <div style={{ fontFamily: "Roboto" }} className="md:text-6xl font-medium tracking-tight flex flex-col h-full justify-center items-start w-full">
                <div className="w-3/5 flex flex-col justify-start items-start h-[20%] ml-24">
                    <div className="flex flex-col justify-start items-start gap-4">

                        {
                            salesScript[index]?.text.split(",").map((line, index1) => {
                                return (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 * index1 }}
                                        key={line} style={{ fontSize: line.length > 20 ? 32 : 64, fontWeight: line.length > 20 ? 400 : 600 }} className={`flex flex-wrap justify-start items-center ${line.length > 20 ? "gap-x-2" : "gap-x-2"} `}>
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
                        {
                            salesScript[index]?.pivot == true &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm px-4 py-1 rounded-full bg-black/90 text-white/80 tracking-normal mt-10">Pivot Available</motion.div>
                        }
                        {
                            index + 1 == salesScript.length &&
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
                        className="flex flex-row justify-start items-center gap-4 mt-36 text-3xl font-normal text-black/40 tracking-tight">
                        {salesScript[index + 1]?.text}
                    </motion.div>

                </div>

            </div>



        </motion.div>
  );
}

export default Demo;