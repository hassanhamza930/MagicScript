import { Button } from "@/components/ui/button";
import { FaFile, FaFileAlt, FaFolderPlus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Scripts() {

  const navigate=useNavigate();

  return (
    <div className="h-full w-full flex justify-start items-start p-10">

      <div className="h-full w-full flex flex-col justify-start items-start">

        <div className="flex flex-row justify-start items-center w-full">
          <div className="text-4xl font-bold text-white/80">Scripts</div>
        </div>

        <div className="flex flex-wrap justify-start items-start gap-3 mt-10">

          <button style={{ fontFamily: "Inter" }} className="text-start hover:transition-all duration-300 hover:shadow-yellow-600/60 flex flex-col justify-start items-start gap-2 shadow-2xl shadow-yellow-600/20 bg-[#401F71] text-white/80 rounded-md px-4 py-3 w-96 h-64 tracking-tight">
            <div className="text-xl font-semibold w-full border-b-[1px] border-b-white/60 pb-2">Inbound Script</div>
            <div className="text-sm font-medium w-full flex flex-col gap-1 justify-start items-start">
              <div className="">Hello John, How are you doing my man?</div>
              <div>My name's hamza and i'm calling to tell you a bit more about our product</div>

            </div>
          </button>

          <button onClick={()=>{navigate("/newscript")}} style={{ fontFamily: "Inter" }} className="opacity-50 hover:opacity-90 hover:transition-all duration-300 hover:scale-[1.02] hover:shadow-yellow-600/60 flex flex-col justify-center items-center gap-2 shadow-2xl shadow-yellow-600/20 bg-white/80 text-black/80 rounded-md w-64 h-24 tracking-tighter">
            <div className="text-xl font-semibold w-full text-center">Create a new script</div>
            <FaFolderPlus size={30} />

          </button>



        </div>


      </div>

    </div>
  );
}

export default Scripts;