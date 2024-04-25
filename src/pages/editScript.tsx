import { isLoadingAtom } from "@/atoms/atoms";
import { Button } from "@/components/ui/button";
import { Script, ScriptLine } from "@/interfaces";
import { addDoc, collection, doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "sonner";











function EditScript() {
  const [isEditingName, setisEditingName] = useState(false);
  const [scriptName, setscriptName] = useState("Untitled Script");
  const [scriptLines, setscriptLines] = useState([
    { text: "" },
  ] as Array<ScriptLine>);

  const db = getFirestore();
  const [, setloading] = useRecoilState(isLoadingAtom);
  const navigate = useNavigate();
  const [selectedNode, setselectedNode] = useState(-1);
  const {scriptid}=useParams();


  useEffect(()=>{
    onSnapshot(doc(db, "users", localStorage.getItem("uid") as string, "scripts",scriptid!), (doc) => {
        var scriptData = doc.data() as Script;
        setscriptLines(scriptData.lines);
        setscriptName(scriptData.name);
    })
  },[])


  async function publish() {
    setloading(true);
    console.log("Publishing Script");
    await setDoc(
      doc(
        db,
        "users",
        localStorage.getItem("uid")! as string,
        "scripts",
        scriptid!
      ),
      {
        name: scriptName,
        lines: scriptLines,
      },
      {
        merge: true
      }
    );
    setloading(false);
    toast.success("Script Published Successfully");
    navigate("/");
  }

  return (
    <div className="relative h-full w-full flex justify-start items-start p-5 tracking-tighter">
      <div className="relative h-full w-full flex flex-col justify-start items-start">
        <div className="w-full flex flex-row justify-between items-center absolute z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setisEditingName(false);
            }}
            className="flex flex-row justify-start items-center text-white/80 gap-5"
          >
            {isEditingName == true ? (
              <input
                value={scriptName}
                onChange={(e) => {
                  setscriptName(e.target.value);
                }}
                type="text"
                className="w-96 bg-transparent border-b-[1px] pb-1 border-white outline-none text-white/80 text-2xl font-medium"
              />
            ) : (
              <div className="text-2xl font-medium">{scriptName}</div>
            )}

            {isEditingName == true ? (
              <Button
                type="submit"
                className="hover:scale-105 bg-white/90 transiton-all duration-300 tracking-normal "
              >
                Save
              </Button>
            ) : (
              <button
                onClick={() => {
                  setisEditingName(true);
                }}
                className="hover:scale-105 transiton-all duration-300"
              >
                <FiEdit size={20} />
              </button>
            )}
          </form>

          <Button
            disabled={scriptLines[0].text != "" ? false : true}
            onClick={() => {
              publish();
            }}
            className="hover:scale-105 bg-[#f4f269] shadow-[#5cb270] shadow-sm backdrop-blur-md rounded-sm transiton-all duration-300 tracking-normal mr-10 "
          >
            Publish
          </Button>
        </div>

        <div className="flex flex-row justify-start items-start h-full gap-2">
        <div className="flex flex-row justify-start items-start gap-2">
        <div className="h-full mt-14 flex flex-col items-start justify-start ">
          {
            scriptLines.map((line, index) => {
              return (
                <div
                  onMouseDown={() => { setselectedNode(index) }}
                  className="flex flex-col justify-start items-center">
                  <div className="flex flex-row justify-start items-center">

                    <textarea
                      value={line.text}
                      onChange={(e) => {
                        const newLines = scriptLines;
                        newLines[index].text = e.target.value;
                        setscriptLines([...newLines]);
                      }}
                      placeholder="Hello John, how are you doing today..."
                      className="w-96 h-24 text-sm rounded-xl border-[2px] border-white/60 px-4 py-2 bg-black/20 text-white"
                    />
                    {/* {
                      index == selectedNode &&
                      <div className="absolute ml-96 w-4 h-[2px] bg-white/60" />
                    }
                    {
                      index == selectedNode &&
                      <button style={{ fontFamily: "Inter" }} onClick={() => {
                        const newLines = scriptLines;
                        newLines[index].pivot = true;
                        newLines[index].newMessages = [{ text: "" }];
                        setscriptLines([...newLines]);
                      }} className="absolute ml-[400px] text-xs font-normal tracking-tight bg-white/90 text-black/80 rounded-md px-4 py-1 hover:shadow-2xl hover:scale-105 transition-all duration-300">+ Add Pivot</button>
                    } */}

                  </div>
                  <div className="h-4 w-[2px] bg-white/60" />
                  {
                    index == scriptLines.length - 1 &&
                    <button style={{ fontFamily: "Inter" }} onClick={() => { setscriptLines([...scriptLines, { text: "" }]) }} className="text-xs font-normal tracking-tight bg-white/90 text-black/80 rounded-md px-4 py-1 hover:shadow-2xl hover:scale-105 transition-all duration-300">+ Add a New Line</button>
                  }
                </div>
              )
            })
          }
        </div>
      </div>

          {/* <PivotComponent/> */}

        </div>

      </div>
    </div>
  );
}

export default EditScript;
