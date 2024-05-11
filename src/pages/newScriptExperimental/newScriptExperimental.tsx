import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, Edge, EdgeTypes, Node } from 'reactflow';
import { applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import { useState, useCallback, useMemo, useEffect } from 'react';
import InputNode from './customNodeType';
import { useRecoilState } from 'recoil';
import { nodesAtom, edgesAtom, isLoadingAtom } from '@/atoms/atoms';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FiEdit } from 'react-icons/fi';
import { ScriptExperimental } from '@/interfaces';
import { useNavigate, useParams } from 'react-router-dom';

function NewScriptExperimental() {


    const [nodes, setNodes] = useRecoilState(nodesAtom);
    const [edges, setEdges] = useRecoilState(edgesAtom);
    const [loading, setloading] = useRecoilState(isLoadingAtom);
    const [isEditingName, setisEditingName] = useState(false);
    const [scriptName, setscriptName] = useState("Untitled Script");
    const { scriptid } = useParams();
    const db = getFirestore();
    const navigate=useNavigate();



    async function fetchInitialDataFromFirebase() {
        var docData = (await getDoc(doc(db, "users", localStorage.getItem('uid')! as string, "scripts", scriptid!))).data() as ScriptExperimental;
        setNodes([...docData.nodes]);
        setEdges([...docData.edges])
        setscriptName(docData.name)
    }

    useEffect(() => {
        if (scriptid != undefined) {
            fetchInitialDataFromFirebase();
        }
    }, [])


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


    async function saveToFirebase() {
        setloading(true);
        if (scriptid == undefined) {
            await addDoc(collection(db, "users", localStorage.getItem('uid')! as string, "scripts"),
                {
                    edges: edges,
                    nodes: nodes,
                    name: scriptName
                } as ScriptExperimental
            )
        }
        else {
            await setDoc(doc(db, "users", localStorage.getItem('uid')! as string, "scripts", scriptid!),
                {
                    edges: edges,
                    nodes: nodes,
                    name: scriptName
                } as ScriptExperimental,
                {
                    merge: true
                }
            )
        }
        setloading(false);
        toast.success("Succcesfully Saved")
        navigate('/')
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
            <div className="w-full flex flex-row justify-between items-center absolute z-10 px-5 py-3 bg-black/60 backdrop-blur-xl">
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
                    onClick={() => { saveToFirebase() }}
                    className="hover:scale-105 bg-[#f4f269] shadow-[#5cb270] shadow-sm backdrop-blur-md rounded-sm transiton-all duration-300 tracking-normal mr-10 "
                >
                    Publish
                </Button>
            </div>
        </div>
    );
}

export default NewScriptExperimental;