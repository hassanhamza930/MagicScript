import { Button } from "@/components/ui/button";
import { Script } from "@/interfaces";
import { collection, deleteDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaFile, FaFileAlt, FaFolderPlus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Scripts() {

  const navigate = useNavigate();
  const [scripts, setscripts] = useState([] as Array<Script>);
  const db = getFirestore();

  useEffect(() => {
    var unsub = onSnapshot(collection(db, "users", localStorage.getItem('uid')! as string, "scripts"), (snap) => {
      setscripts(snap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as Script
      }));
    })

    return () => {
      unsub();
    }
  }, [])



  return (
    <div className="h-full w-full flex justify-start items-start p-10">

      <div className="h-full w-full flex flex-col justify-start items-start">

        <div className="w-full flex flex-row justify-start items-center gap-10">
          <div className="text-4xl font-bold text-white/90">
            Scripts
          </div>

          <Button onClick={() => { navigate("/newscript") }} className="hover:scale-105 bg-[#f4f269] shadow-[#5cb270] shadow-sm backdrop-blur-md rounded-sm transiton-all duration-300 tracking-normal ">
            New Script
          </Button>

        </div>

        <div className="flex flex-wrap justify-start items-start gap-3 w-full overflow-y-auto mt-10">

          {
            scripts.map((script) => {
              return (
                <div style={{ fontFamily: "Inter" }} className="text-start hover:transition-all duration-300 hover:shadow-yellow-600/60 flex flex-col justify-start items-start gap-2 shadow-2xl shadow-yellow-600/20 bg-gradient-to-b from-white/80 to-white/60 text-black/80 rounded-md px-4 py-3 w-72 h-64 tracking-tight">
                  <div className="text-xl font-semibold w-full border-b-[1px] border-b-black/60 pb-2 overflow-hidden flex justify-start items-start h-10">{script.name}</div>
                  <div className="text-sm font-medium w-full flex flex-col gap-1 justify-start items-start h-full overflow-y-clip">
                    {
                      script.lines.map((line, index) => {
                        return (
                          <div className="">{line.text}</div>
                        )
                      })
                    }
                  </div>

                  <div className="flex flex-row justify-end items-end w-full gap-2">
                    <Button onClick={async () => {
                      var confirm=window.confirm("Are you sure you want to delete this script?");
                      if (!confirm) {
                        return;
                      }
                      await deleteDoc(doc(db, "users", localStorage.getItem('uid')! as string, "scripts", script.id!));
                      toast.success("Script Deleted Successfully");
                    }} className="px-8 py-2 bg-black/60 text-white">Delete</Button>
                    <Button className="px-8 py-2 bg-black/80 text-white">Play</Button>
                  </div>
                </div>
              )
            })
          }

          {/* <button onClick={() => { navigate("/newscript") }} style={{ fontFamily: "Inter" }} className="opacity-50 hover:opacity-90 hover:transition-all duration-300 hover:scale-[1.02] hover:shadow-yellow-600/60 flex flex-col justify-center items-center gap-1 shadow-2xl shadow-yellow-600/20 bg-white/80 text-black/80 rounded-md w-52 h-24 tracking-tighter">
            <div className="text-md font-semibold w-full text-center">Create a new script</div>
            <FaFolderPlus size={25} />
          </button> */}



        </div>


      </div>

    </div>
  );
}

export default Scripts;