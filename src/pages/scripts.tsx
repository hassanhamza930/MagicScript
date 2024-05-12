import { currentUserAtom } from "@/atoms/atoms";
import { Button } from "@/components/ui/button";
import { Script, ScriptExperimental } from "@/interfaces";
import { collection, deleteDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaFile, FaFileAlt, FaFolderPlus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactFlow, { Background } from "reactflow";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import InputNode from "./newScriptExperimental/customNodeType";

function Scripts() {

  const navigate = useNavigate();
  const [scripts, setscripts] = useState([] as Array<ScriptExperimental>);
  const [loggedInUser, setloggedInUser] = useRecoilState(currentUserAtom);
  const db = getFirestore();
  const nodeTypes = useMemo(() => ({ inputNode: InputNode }), []);

  useEffect(() => {
    var unsub = onSnapshot(collection(db, "users", localStorage.getItem('uid')! as string, "scripts"), (snap) => {
      setscripts(snap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as ScriptExperimental
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

          <Button onClick={() => { navigate("/newscriptexperimental") }} className="hover:scale-105 bg-[#f4f269] shadow-[#5cb270] shadow-sm backdrop-blur-md rounded-sm transiton-all duration-300 tracking-normal ">
            New Script
          </Button>

        </div>

        <div className="flex flex-wrap justify-start items-start gap-3 w-full overflow-y-auto mt-10">

          {
            scripts.map((script) => {
              return (
                <div key={script.id!} style={{ fontFamily: "Inter" }} className="text-start hover:transition-all duration-300 hover:shadow-yellow-600/60 flex flex-col justify-start items-start gap-2 shadow-2xl shadow-yellow-600/20 bg-gradient-to-b from-white/80 to-white/60 text-black/80 rounded-md px-4 py-3 w-96 h-64 tracking-tight">
                  <div className="text-xl font-bold w-full border-b-[1px] border-b-black/60 pb-2 overflow-hidden flex justify-start items-start h-10">{script.name}</div>
                  <div className="text-sm w-full flex flex-col gap-1 justify-start items-start h-full overflow-y-clip">

                    {
                      script.nodes.map((node, index) => {
                        return (
                          <div className="flex flex-row justify-start items-start gap-1 font-medium w-full">
                            {
                              `${index+1}.`
                            }
                            <div className="">
                              
                              {
                                node.data.value
                              }
                            </div>
                          </div>
                        )
                      })
                    }

                  </div>

                  <div className="flex flex-row justify-end items-end w-full gap-2">
                    <Button onClick={() => {
                      navigate(`/edit/${script.id}`)
                    }} className="bg-black text-white">
                      <FaEdit />
                    </Button>

                    <div className="w-full" />

                    <Button onClick={async () => {
                      var confirm = window.confirm("Are you sure you want to delete this script?");
                      if (!confirm) {
                        return;
                      }
                      await deleteDoc(doc(db, "users", localStorage.getItem('uid')! as string, "scripts", script.id!));
                      toast.success("Script Deleted Successfully");
                    }} className="px-8 py-2 bg-black/60 text-white">Delete</Button>
                    <Button onClick={() => {
                      if (loggedInUser.plan != "Paid" && script.id != "demo") {
                        navigate("/license")
                        return 0;
                      } else {
                        navigate(`/play/${script.id}`)
                      }
                    }} className="px-8 py-2 bg-black/80 text-white">Play</Button>
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