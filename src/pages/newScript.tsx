import { isLoadingAtom } from "@/atoms/atoms";
import { Button } from "@/components/ui/button";
import { ScriptLine } from "@/interfaces";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

const ScriptLineComponent: React.FC<{
  scriptLines: Array<ScriptLine>;
  setscriptLines: (lines: Array<ScriptLine>) => void;
  heading?: string;
}> = ({ scriptLines, setscriptLines, heading }) => {
  const [selectedLine, setselectedLine] = useState("");

  const handleAddNewMessageInSelectedLine = (line: ScriptLine[]): void => {
    const lineData = scriptLines.find((sl) => sl.id === selectedLine);

    if (lineData) {
      lineData.newMessages = line;
      setscriptLines([...scriptLines]);
    }
  };

  return (
    <div className="flex items-start justify-start gap-8">
      <div className="tracking-normal  flex flex-col justify-start items-center h-full bg-white/10 rounded-xl p-2 px-4 overflow-y-auto ">
        <h2 className="text-xl text-white">{heading}</h2>

        {scriptLines.map((line, index) => {
          return (
            <div className="flex flex-col justify-start items-center">
              <div
                className=""
                onClick={() => {
                  setselectedLine(line.id);
                }}
              >
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
              </div>
              <div className="h-4 w-[2px] bg-white/80" />
            </div>
          );
        })}

        <button
          onClick={() => {
            setscriptLines([
              ...scriptLines,
              { id: scriptLines.length.toString(), text: "" },
            ]);
          }}
          className="mt-4 mb-10 px-8 py-2 bg-white rounded-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-600"
        >
          <FaPlus className="text-black" size={10} />
        </button>
      </div>
      {selectedLine != "" && (
        <ScriptLineComponent
          heading={scriptLines.find((sl) => sl.id === selectedLine)?.text || ""}
          scriptLines={
            scriptLines.find((sl) => sl.id === selectedLine)?.newMessages || []
          }
          setscriptLines={handleAddNewMessageInSelectedLine}
        />
      )}
    </div>
  );
};

function NewScript() {
  const [isEditingName, setisEditingName] = useState(false);
  const [scriptName, setscriptName] = useState("Untitled Script");
  const [scriptLines, setscriptLines] = useState([
    { text: "" },
  ] as Array<ScriptLine>);
  const db = getFirestore();
  const [, setloading] = useRecoilState(isLoadingAtom);
  const navigate = useNavigate();

  async function publish() {
    setloading(true);
    console.log("Publishing Script");
    await addDoc(
      collection(
        db,
        "users",
        localStorage.getItem("uid")! as string,
        "scripts"
      ),
      {
        name: scriptName,
        lines: scriptLines,
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
        {/* <div className="mt-14">
          <NewScriptComponent />
        </div> */}
        <div className="h-full mt-14 flex items-start justify-start ">
          <ScriptLineComponent
            scriptLines={scriptLines}
            setscriptLines={setscriptLines}
          />
        </div>
      </div>
    </div>
  );
}

export default NewScript;
