import { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Edge,
  Node,
} from "reactflow";

import "reactflow/dist/base.css";

import CustomNode, { NodeDataProps } from "./CustomNode";
import { Button } from "@/components/ui/button";
import CustomEdge from "./CustomEdge";
import { useRecoilState } from "recoil";
import { selectedNodeAtom } from "@/atoms/atoms";
import { toast } from "sonner";

const nodeTypes = {
  custom: CustomNode,
};
const edgeTypes = {
  "custom-edge": CustomEdge,
};

const initNodes = [
  {
    id: "1",
    type: "custom",
    data: {
      id: "1",
      name: "Part 1",
      text: "",
    },
    position: { x: 50, y: 50 },
  },
] as Node<NodeDataProps>[];

const Flow = ({
  handleSave,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSave: (node: Node<NodeDataProps>[], edge: Edge[]) => void;
}) => {
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (connection: any) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const addNode = () => {
    const prevNode =
      nodes?.find((n) => n.id === selectedNode) || nodes[nodes.length - 1];

    // check if prevnode already has a pivot
    if (edges.some((e) => e.source === prevNode.id && e.sourceHandle === "b")) {
      toast.error("This node already has another node");
      return;
    }

    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "custom",
      data: {
        id: (nodes.length + 1).toString(),
        name: `Part ${nodes.length + 1}`,
        text: "",
      } as NodeDataProps,
      position: {
        x: prevNode.position.x,
        y: prevNode.position.y + 200,
      },
    };

    setNodes((n) => n.concat({ ...newNode, deletable: true }));
    setSelectedNode(newNode.id);

    if (nodes.length > 0) {
      setEdges((e) =>
        e.concat({
          id: `e${nodes.length}-${nodes.length + 1}`,
          source: prevNode.id,
          sourceHandle: "b",
          targetHandle: "a",
          target: newNode.id,
          type: "custom-edge",
          deletable: true,
        })
      );
    }
  };

  const addPivot = () => {
    const prevNode =
      nodes?.find((n) => n.id === selectedNode) || nodes[nodes.length - 1];

    // check if prevnode already has a pivot
    if (edges.some((e) => e.source === prevNode.id && e.sourceHandle === "c")) {
      toast.error("This node already has a pivot");
      return;
    }

    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "custom",
      data: {
        id: (nodes.length + 1).toString(),
        name: `Part ${nodes.length + 1}`,
        text: "",
      } as NodeDataProps,
      position: {
        x: prevNode.position.x + 400,
        y: prevNode.position.y,
      },
    };

    setNodes((n) => n.concat({ ...newNode, deletable: true }));
    setSelectedNode(newNode.id);

    if (nodes.length > 0) {
      setEdges((e) =>
        e.concat({
          id: `e${nodes.length}-${nodes.length + 1}`,
          source: prevNode.id,
          sourceHandle: "c",
          targetHandle: "d",
          target: newNode.id,
          type: "custom-edge",
          deletable: true,
        })
      );
    }
  };

  return (
    <>
      <div className="flex itens-center justify-end w-full gap-6 my-5">
        <Button onClick={addNode}>Add A new Node</Button>
        <Button onClick={addPivot}>Add A Pivot</Button>
        <Button
          onClick={() => {
            handleSave(nodes, edges);
          }}
        >
          Save
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className="w-full h-full "
      >
        <MiniMap className="bg-black/50 text-white" />
        <Controls />
        <Background />
      </ReactFlow>
    </>
  );
};

export default Flow;
