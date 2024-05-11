import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, Edge, EdgeTypes, Node } from 'reactflow';
import { applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import { useState, useCallback, useMemo } from 'react';
import InputNode from './customNodeType';
import { useRecoilState } from 'recoil';
import { nodesAtom, edgesAtom, isLoadingAtom } from '@/atoms/atoms';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from 'sonner';

function NewScriptExperimental() {


    const [nodes, setNodes] = useRecoilState(nodesAtom);
    const [edges, setEdges] = useRecoilState(edgesAtom);
    const [loading, setloading] = useRecoilState(isLoadingAtom);


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

    const nodeTypes = useMemo(() => ({ inputNode: InputNode }), []);
    const db = getFirestore();


    async function saveToFirebase() {
        setloading(true);
        await addDoc(collection(db, "users", localStorage.getItem('uid')! as string, "scripts"),
            {
                edges:edges,
                nodes:nodes
            }
        )
        setloading(false);
        toast.success("Succcesfully Saved")
    }



    return (
        <div className="flex h-full w-full justify-start items-start">
            <ReactFlow nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls />

            </ReactFlow>
            <div className='absolute z-10 m-10 '>
                <button onClick={()=>{saveToFirebase()}} className='bg-blue-600 text-white px-10 py-2 rounded-sm shadow-yellow-500/20 shadow-md hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:shadow-yellow-500/60'>
                    Publish
                </button>
            </div>
        </div>
    );
}

export default NewScriptExperimental;