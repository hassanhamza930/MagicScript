import { edgesAtom, indexAtom, isLoadingAtom, nodesAtom } from "@/atoms/atoms";
import { ScriptExperimental, ScriptLine } from "@/interfaces";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Node, Edge, NodeProps } from 'reactflow';

function Play() {
    const [index, setindex] = useRecoilState(indexAtom);
    const { scriptid } = useParams();
    const db = getFirestore();
    const [nodes, setNodes] = useRecoilState(nodesAtom);
    const [edges, setEdges] = useRecoilState(edgesAtom);
    const [loading, setloading] = useRecoilState(isLoadingAtom);
    const [transformedLines, settransformedLines] = useState([] as Array<ScriptLine>);



    interface Line{
        text:string,
        pivot:boolean,
        newMessages:Array<Line>
    }

    async function fetchInitialDataFromFirebase() {
        setloading(true);
        var docData = (await getDoc(doc(db, "users", localStorage.getItem('uid')! as string, "scripts", scriptid!))).data() as ScriptExperimental;
        setNodes([...docData.nodes]);
        setEdges([...docData.edges])


        
        
        function findTree(startingNode:Node){
            var tempTransformedLines=[] as Array<Line>
            var startingNode=docData.nodes[0] as Node
            var childNodes=[] as Array<Node>
            var edgeTargets=edges.filter(edge=>edge.source==startingNode.id);
            if(edgeTargets.length>1){
                //this is a pivot starter node
                edgeTargets.forEach((edgeTarget)=>{
                    childNodes.push(nodes.find((node)=>node.id==edgeTarget.target)!)
                })
                
                tempTransformedLines.push(
                    {
                        text:startingNode.data.value,
                        pivot:startingNode.data.isPivotStarter as boolean,
                        newMessages:childNodes.map((node)=>{
                           return{
                            text:node.data.value,
                            pivot:false,
                            newMessages:[]
                           } 
                        })
                    }
                )
            }
            else if(edgeTargets.length==1){
                //this is a simple node
                tempTransformedLines.push({
                    newMessages:[],
                    pivot:false,
                    text:nodes.find((node)=>node.id==edgeTargets[0].target)?.data.value!
                })
                
            }
            
            return tempTransformedLines;
    
        
        }
        
        var result=findTree(docData.nodes[0]);
        console.log(result);
        setloading(false);
    }


    useEffect(() => {
        fetchInitialDataFromFirebase();
    }, [])


    const escFunction = (event: any) => {
        if (event.key === "ArrowDown") {
        //    setcurrentNode(nextNodes[0]);
        }
        else if (event.key === "ArrowUp") { // Use strict equality (===)
            if ((index - 1) < 0) {
                setindex(0);
            }
            else {
                setindex(index - 1);
            }
        }
    };

    useEffect(() => {
        document.removeEventListener("keyup", escFunction);

        document.addEventListener("keyup", escFunction);
        return () => {
            document.removeEventListener("keyup", escFunction);
        };
    }, [index, transformedLines]);

    useEffect(() => {
        setindex(0);
    }, [])


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ transition: 0.7 }}
            className="h-full w-full flex justify-start items-center bg-gradient-to-b from-white to-white/80 text-black/80 overflow-y-hidden">
            <div className="h-full absolute z-10 flex flex-col justify-start items-start py-10 ml-24 text-sm">
                <div className="flex flex-row justify-between items-center w-48"> <b>Next</b> Arrow Down </div>
                <div className="flex flex-row justify-between items-center w-48"> <b>Previous</b> Arrow Up </div>
                {/* <div className="flex flex-row justify-between items-center w-48"> <b>Pivot</b> Arrow Right </div> */}
            </div>

            {/* <div style={{ fontFamily: "Roboto" }} className="md:text-6xl font-medium tracking-tight flex flex-col h-full justify-center items-start w-full">
                <div className="w-3/5 flex flex-col justify-start items-start h-[20%] ml-24">
                    <div className="flex flex-col justify-start items-start gap-4">

                        {
                            currentNode?.data?.value?.split(",").map((line, index1) => {
                                return (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 * index1 }}
                                        key={line} style={{ fontSize: line.length > 20 ? 32 : 64, fontWeight: line.length > 20 ? 400 : 600 }} className={`flex flex-wrap justify-start items-center ${line.length > 20 ? "gap-x-2" : "gap-x-2"} gap-y-2 `}>
                                        {
                                            line.trim().split(" ").map((word, index2) => {
                                                return (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.4, delay: 0.1 * (index1 + index2) }}
                                                        key={word} >
                                                        {word}
                                                    </motion.div>
                                                )
                                            })
                                        }
                                    </motion.div>
                                )
                            })
                        }
                        {
                            salesScript[index]?.pivot == true &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm px-4 py-1 rounded-full bg-white/90 text-black/80 tracking-normal mt-10">Pivot Available</motion.div>
                        }
                        {
                            index + 1 == salesScript.length &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm px-4 py-1 rounded-full bg-yellow-400 text-black/80 tracking-normal mt-10">End of Call</motion.div>
                        }
                    </div>

                    {
                        nextNodes.length > 0 && nextNodes[0].data.value!=undefined &&
                        nextNodes.map((node) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex flex-row justify-start items-center gap-4 mt-36 text-3xl font-normal text-black/40 tracking-tight">
                                    {node.data.value }
                                </motion.div>
                            )
                        })
                    }

                </div>

            </div> */}



        </motion.div>
    );
}

export default Play;