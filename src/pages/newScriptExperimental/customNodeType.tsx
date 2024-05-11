import { useCallback, useEffect, useState } from 'react';
import { Handle, Node, Position } from 'reactflow';
import { IoReorderThreeSharp } from "react-icons/io5";
import { useRecoilState } from 'recoil';
import { edgesAtom, nodesAtom, tipAtom } from '@/atoms/atoms';
import { Timestamp } from 'firebase/firestore';
import { NodeProps } from '@/interfaces';

const handleStyle = { left: 10 };

export default function InputNode(data: NodeProps) {


    const [nodes, setNodes] = useRecoilState(nodesAtom);
    const [edges, setEdges] = useRecoilState(edgesAtom);
    const [tip, settip] = useRecoilState(tipAtom);
    const [hasChildren, sethasChildren] = useState(false);

    const onChange = useCallback((evt) => {
        var tempNodes=Array.from(nodes);
        tempNodes.forEach((node,index)=>{
            if(node.id==data.id){
                tempNodes[index]={...tempNodes[index],data:{...tempNodes[index].data,value:evt.target.value}}
            }
        })
        setNodes([...tempNodes])
    }, []);





    function makeIsTip() {
        var isTip = true;
        edges.forEach((edge) => {
            if (edge.source == data.id) {
                isTip = false
            }
        })
        if (isTip == true) {
            settip(data.id);
        }
    }



    return (
        <>
            <Handle className='bg-blue-600 h-[10px] w-[10px] ' type="target" position={Position.Top} />
            <div className='w-full flex flex-col justify-start items-center backdrop-blur-xl'>
                {
                    data.data.isPivotStarter == true &&
                    <div className=' w-full text-xs bg-white/10 text-white rounded-t-sm flex flex-col justify-start items-start'>
                        <div className='px-3 py-2 flex flex-none bg-yellow-400 text-black font-medium w-full'>
                            Customer Says:
                        </div>
                        <textarea className='font-normal h-20 px-4 py-2 w-full outline-none bg-transparent text-white border-yellow-500 border-2 border-b-0 border-dotted' placeholder="I don't want it"></textarea>
                    </div>
                }
                <div onMouseDown={() => { makeIsTip() }} className='bg-white rounded-b-sm flex flex-row py-1 px-2 justify-start items-start w-64'>
                    <div className='flex flex-col justify-start items-start h-full gap-[2px] w-[10px] pt-3 cursor-move'>
                        <div className='w-full h-[1px] bg-black/90'></div>
                        <div className=' w-full h-[1px] bg-black/90'></div>
                        <div className='w-full h-[1px] bg-black/90'></div>
                    </div>

                    {
                        tip == data.id &&
                            <div className='absolute z-10 bottom-0 -mb-8 flex flex-row w-auto gap-2'>
                                <button onClick={() => {

                                    settip("");
                                    const NewTargetNodeId = `${data.id}-1`;


                                    setNodes(
                                        [...nodes,
                                        {
                                            id: NewTargetNodeId,
                                            type: "inputNode",
                                            data: { id: NewTargetNodeId, isPivotStarter: false },
                                            position: {
                                                x: data.xPos,
                                                y: data.data.isPivotStarter == true ? data.yPos + 300 : data.yPos + 200
                                            }
                                        } as Node
                                        ]
                                    )

                                    setEdges(
                                        [...edges,
                                        {
                                            id: `${data.id}-${NewTargetNodeId}`,
                                            source: data.id,
                                            target: NewTargetNodeId,
                                            type: "smoothstep"
                                        }
                                        ]
                                    )

                                }} className='bg-white hover:bg-indigo-600 hover:shadow-yellow-500/20 hover:shadow-xl text-black hover:text-white text-medium text-[8px] px-5 py-1 rounded-sm shadow-2xl hover:scale-105 transition-all duration-300 shadow-yellow-600'>
                                    Add new Line
                                </button>
                                <button onClick={() => {

                                    settip("");
                                    const leftTargetNodeId = `${data.id}-1`;
                                    const rightTargetNodeId = `${data.id}-2`;


                                    setNodes(
                                        [...nodes,
                                        {
                                            id: leftTargetNodeId,
                                            type: "inputNode",
                                            data: { id: leftTargetNodeId, isPivotStarter: true, customerSays: "I Don't want this" },
                                            position: {
                                                x: data.xPos - 150,
                                                y: data.yPos + 300
                                            }
                                        } as Node,
                                        {
                                            id: rightTargetNodeId,
                                            type: "inputNode",
                                            data: { id: rightTargetNodeId, isPivotStarter: true, customerSays: "I think its too expensive" },
                                            position: {
                                                x: data.xPos + 150,
                                                y: data.yPos + 300
                                            }
                                        } as Node
                                        ]
                                    )

                                    setEdges(
                                        [...edges,
                                        {
                                            id: `${data.id}-${leftTargetNodeId}`,
                                            source: data.id,
                                            target: leftTargetNodeId,
                                            type: "smoothstep"
                                        },
                                        {
                                            id: `${data.id}-${rightTargetNodeId}`,
                                            source: data.id,
                                            target: rightTargetNodeId,
                                            type: "smoothstep"
                                        }
                                        ]
                                    )

                                }} className='bg-blue-600 hover:bg-indigo-600 hover:shadow-yellow-500/20 hover:shadow-xl text-white text-medium text-[8px] px-5 py-1 rounded-sm shadow-2xl hover:scale-105 transition-all duration-300 shadow-yellow-600'>
                                    Add Pivot
                                </button>
                            </div> 
                           
                    }
              
                    <textarea placeholder='Next Line' value={data.data.value} onChange={onChange} id="text" name="text"  className="nodrag h-24 w-full text-xs p-2 outline-none" />
                </div>
            </div>
            <Handle className='bg-blue-600 h-[10px] w-[10px] ' type="source" position={Position.Bottom} id="a" />

        </>
    );
}