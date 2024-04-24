import { NodeType } from "@/interfaces";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Flow = ({ addNewFlow }: { addNewFlow: () => void }) => {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  return (
    <div>
      <div className="flex  gap-2 flex-col justify-start items-center">
        {nodes.map((node, index) => {
          return (
            <div className="flex flex-col justify-start items-center">
              <div className="">
                <textarea
                  value={node.text}
                  onChange={(e) => {
                    const newNodes = nodes;
                    newNodes[index].text = e.target.value;
                    setNodes([...newNodes]);
                  }}
                  placeholder="Hello John, how are you doing today..."
                  className="w-96 h-24 text-sm rounded-xl border-[2px] border-white/60 px-4 py-2 bg-black/20 text-white"
                />
                <button
                  onClick={() => {
                    // setNodes((prev) => {
                    //   return [
                    //     ...prev,
                    //     {
                    //       prevNodeId: prev[prev.length - 1]?.prevNodeId ?? "",
                    //       text: "",
                    //       id: prev.length.toString(),
                    //     },
                    //   ];
                    // });
                    addNewFlow();
                  }}
                  className="px-8 py-2 bg-white rounded-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-600 absolute"
                >
                  <FaPlus className="text-black" size={10} />
                </button>
              </div>
              <div className="h-4 w-[2px] bg-white/80" />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          setNodes((prev) => {
            return [
              ...prev,
              {
                prevNodeId: prev[prev.length - 1]?.prevNodeId,
                text: "",
                id: prev.length.toString(),
              },
            ];
          });
        }}
        className="mt-4 mb-10 px-8 py-2 bg-white rounded-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-600"
      >
        <FaPlus className="text-black" size={10} />
      </button>
    </div>
  );
};
const NewScriptComponent = () => {
  const [flows, setFlows] = useState<
    {
      id: string;
      nodes: NodeType[];
    }[]
  >([
    {
      id: "0",
      nodes: {} as NodeType[],
    },
  ]);

  const addNewFlow = () => {
    setFlows((prev) => {
      return [
        ...prev,
        {
          id: prev.length.toString(),
          nodes: [],
        },
      ];
    });
  };

  return (
    <div className="flex items-start gap-32">
      {flows.map((flow, index) => {
        return (
          <div key={index}>
            <Flow addNewFlow={addNewFlow} />
          </div>
        );
      })}
    </div>
  );
};

export default NewScriptComponent;
