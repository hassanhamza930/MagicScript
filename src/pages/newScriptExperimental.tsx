import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, Edge, EdgeTypes, Node } from 'reactflow';
import { applyEdgeChanges, applyNodeChanges,addEdge } from 'reactflow';
import { useState, useCallback } from 'react';



function NewScriptExperimental() {

    const initialNodes = [
        {
            id: '1',
            data: { label: 'Hello' },
            position: { x: 0, y: 0 },
            type: 'input',
        },
        {
            id: '2',
            data: { label: 'World' },
            position: { x: 100, y: 100 },
        },
    ];


    const initialEdges = [] as Array<Edge>;

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);


    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
      );

      
    return (
        <div className="flex h-full w-full justify-center items-center">
            <ReactFlow nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                fitView 
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default NewScriptExperimental;