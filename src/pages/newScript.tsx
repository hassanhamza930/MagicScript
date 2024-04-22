import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

function NewScript() {

    const [isEditingName, setisEditingName] = useState(false);
    const [scriptName, setscriptName] = useState("Untitled Script");

    return (
        <div className="h-full w-full flex justify-start items-start p-10 tracking-tighter">

            <div className="h-full w-full flex flex-col justify-start items-start">

                <div className="flex flex-row justify-start items-center w-full text-white/80 gap-5">
                    
                    
                    {
                        isEditingName==true?
                        <input value={scriptName} onChange={(e)=>{setscriptName(e.target.value)}} type="text" className="w-96 h-12 bg-transparent border-b-[2px] border-white outline-none text-white/80 text-3xl font-bold" />
                        :
                        <div className="text-3xl font-bold">{scriptName}</div>
                    }



                    {
                        isEditingName == true ?
                            <Button onClick={() => { setisEditingName(false); }} className="hover:scale-105 transiton-all duration-300 text-lg py-4 ">
                                Save
                            </Button> 
                            :
                            <button onClick={() => { setisEditingName(true); }} className="hover:scale-105 transiton-all duration-300">
                                <FiEdit size={25} />
                            </button>
                    }
                </div>



            </div>

        </div>
    );
}

export default NewScript;