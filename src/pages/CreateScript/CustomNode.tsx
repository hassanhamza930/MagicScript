import { selectedNodeAtom } from "@/atoms/atoms";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { useRecoilState } from "recoil";

export type NodeDataProps = {
  id: string;
  name: string;
  text: string;
};

type Prop = NodeProps & {
  data: NodeDataProps;
};

function CustomNode({ data }: Prop) {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);

  return (
    <div
      onClick={() => {
        setSelectedNode(data.id);
      }}
      className={cn(
        "px-4 pt-2 pb-4 w-96 h-52 shadow-md rounded-md bg-white border-2 ",
        selectedNode === data.id ? "border-blue-500" : "border-transparent"
      )}
    >
      <div className="flex flex-col w-full h-full">
        <div className="ml-2 w-full ">
          <div className="text-lg font-bold">{data.name}</div>
        </div>
        <Textarea
          placeholder="write the next part "
          className="resize-none w-full h-full"
          value={data.text}
          onChange={(e) => {
            setNodes((nodes) =>
              nodes.map((node) => {
                if (node.id === data.id) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      text: e.target.value,
                    },
                  };
                }
                return node;
              })
            );
          }}
        />
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Top}
        className="w-16 !bg-yellow-500"
      />
      <Handle
        id="b"
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-yellow-500"
      />
      <Handle
        id="c"
        type="source"
        position={Position.Right}
        className="h-6 !bg-yellow-500"
      />
      <Handle
        id="d"
        type="target"
        position={Position.Left}
        className="h-6 !bg-yellow-500"
      />
    </div>
  );
}

export default CustomNode;
