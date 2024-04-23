import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import CreateScript from "./CreateScript";
import { Edge, Node } from "reactflow";
import { Timestamp, doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { ScriptEdgeType, ScriptNodeType, ScriptType } from "@/interfaces";
import { toast } from "sonner";

function NewScript() {
  const [isEditingName, setisEditingName] = useState(false);
  const [scriptName, setscriptName] = useState("Untitled Script");

  const db = getFirestore();

  const handleSave = async (nodes: Node[], edges: Edge[]) => {
    console.log(nodes, edges);

    try {
      const id = v4();
      await setDoc(doc(db, "scripts", id), {
        id,
        title: scriptName,
        createdAt: Timestamp.now(),
      } as ScriptType);

      const nodePromise = await nodes.map(async (node) => {
        await setDoc(doc(db, "scriptNodes", node.id), {
          ...node,
          scriptId: id,
        } as ScriptNodeType);

        return "done";
      });

      const edgePromise = await edges.map(async (edge) => {
        await setDoc(doc(db, "scriptEdges", edge.id), {
          ...edge,
          scriptId: id,
        } as ScriptEdgeType);

        return "done";
      });

      await Promise.all([...nodePromise, ...edgePromise]);

      toast.success("Script saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error saving script");
    }
  };
  return (
    <div className="h-full w-full flex justify-start items-start p-10 tracking-tighter">
      <div className="h-full w-full flex flex-col justify-start items-start">
        <div className="flex flex-row justify-start items-center w-full text-white/80 gap-5">
          {isEditingName == true ? (
            <input
              value={scriptName}
              onChange={(e) => {
                setscriptName(e.target.value);
              }}
              type="text"
              className="w-96 h-12 bg-transparent border-b-[2px] border-white outline-none text-white/80 text-3xl font-bold"
            />
          ) : (
            <div className="text-3xl font-bold">{scriptName}</div>
          )}

          {isEditingName == true ? (
            <Button
              onClick={() => {
                setisEditingName(false);
              }}
              className="hover:scale-105 transiton-all duration-300 text-lg py-4 "
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
              <FiEdit size={25} />
            </button>
          )}
        </div>

        <CreateScript handleSave={handleSave} />
      </div>
    </div>
  );
}

export default NewScript;
