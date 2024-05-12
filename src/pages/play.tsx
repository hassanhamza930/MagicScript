import { currentNodeAtom, edgesAtom, indexAtom, isLoadingAtom, nextNodesAtom, nodesAtom, previousNodesAtom } from "@/atoms/atoms";
import { ScriptExperimental } from "@/interfaces";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Node, Edge, NodeProps } from 'reactflow';
import { set } from "lodash";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function NextNodePreview(props: { nextNodes: Array<Node> }) {
    const [pivotNode, setpivotNode] = useState(false);

    useEffect(() => {
        if (props.nextNodes.length > 1) {
            setpivotNode(true);
        }
        else {
            setpivotNode(false);
        }
    }, [props.nextNodes[0]?.data?.id])

    return (
        <div className="mt-36 flex flex-col justify-start items-start gap-2">
            {
                props.nextNodes.map((node, index) => {
                    return (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-row justify-start items-center gap-4 text-3xl font-normal text-black/40 tracking-tight">
                            {
                                pivotNode == true ?
                                    <div className="flex flex-row justify-start items-center gap-2 w-full bg-black/5 text-black/80 rounded-sm px-5 py-2">
                                        {
                                            index == 0 &&
                                            <FaArrowRight size={20} />
                                        }
                                        {
                                            index == 1 &&
                                            <FaArrowLeft size={20} />
                                        }
                                        <div className="flex flex-col justify-center items-start gap-1">
                                            <div className="text-xl tracking-tight">{node.data.customerSays}</div>
                                        </div>
                                    </div>


                                    :

                                    <div>
                                        {node.data.value}
                                    </div>
                            }

                        </motion.div>
                    )
                })
            }
        </div>
    )
}



function Play(props:{isDemo:boolean}) {
    const [index, setindex] = useRecoilState(indexAtom);
    const { scriptid } = useParams();
    const db = getFirestore();
    const [nodes, setNodes] = useRecoilState(nodesAtom);
    const [edges, setEdges] = useRecoilState(edgesAtom);
    const [loading, setloading] = useRecoilState(isLoadingAtom);
    const [currentNode, setcurrentNode] = useRecoilState(currentNodeAtom);
    const [nextNodes, setnextNodes] = useRecoilState(nextNodesAtom);
    const [previousNodes, setpreviousNodes] = useRecoilState(previousNodesAtom);


    function findNextNodes(initialNode: Node, edgesProp: Array<Edge>, nodesProp: Array<Node>): Array<Node> {
        console.log('receieved', initialNode)
        var nextNodesTemp = [] as Array<Node>;
        edgesProp.forEach((edge) => {
            if (edge.source == initialNode.id) {
                var nextNode = nodesProp.find((node) => node.id == edge.target);
                nextNodesTemp.push({ ...nextNode } as Node)
            }
        })
        console.log('nextNodesTemp', nextNodesTemp)
        return nextNodesTemp;
    }

    function findPreviousNodes(initialNode: Node, edgesProp: Array<Edge>, nodesProp: Array<Node>): Array<Node> {
        var previousNodesTemp = [] as Array<Node>;
        edgesProp.forEach((edge) => {
            if (edge.target == initialNode.id) {
                var previousNode = nodesProp.find((node) => node.id == edge.source);
                previousNodesTemp.push({ ...previousNode } as Node)
            }
        })
        return previousNodesTemp;
    }



    useEffect(() => {
        setloading(true);
        var unsub = onSnapshot(doc(db, "users", props.isDemo!=true?localStorage.getItem('uid')! as string:"bsLJCL8rBKRy1xxFVNjSik0khOO2", "scripts", props.isDemo!=true?scriptid!:"caDtRIXEfa4IC4FB06as"), (doc) => {
            var docData = doc.data() as ScriptExperimental;
            setNodes([...docData.nodes]);
            setEdges([...docData.edges])
            setcurrentNode(docData.nodes[0])
            var nextNodesTemp = findNextNodes(docData.nodes[0], docData.edges, docData.nodes);
            setnextNodes([...nextNodesTemp])
            setloading(false);
        })
        return (() => { unsub() })
    }, [])

    const escFunction = (event: any) => {
        if (event.key === "ArrowDown") {
            if (nextNodes.length > 1) {
                //multiple pivots here do nothing
                console.log("more than one children");
            }
            else if (nextNodes.length == 1) {
                var nextNode = nextNodes[0];
                var nextNodesTemp = findNextNodes(nextNode, edges, nodes);
                setnextNodes([...nextNodesTemp])
                setcurrentNode(nextNode)
            }
        }
        else if (event.key === "ArrowRight") {
            if (nextNodes.length < 2) { return }
            //user selected first pivot
            var nextNode = nextNodes[0];
            var nextNodesTemp = findNextNodes(nextNode, edges, nodes);
            setnextNodes([...nextNodesTemp]);
            setcurrentNode(nextNode);
        }
        else if (event.key === "ArrowLeft") {
            if (nextNodes.length < 2) { return }
            //user selected second pivot
            var nextNode = nextNodes[1];
            var nextNodesTemp = findNextNodes(nextNode, edges, nodes);
            setnextNodes([...nextNodesTemp]);
            setcurrentNode(nextNode);
        }
        else if (event.key === "ArrowUp") {

            var previousNodesTemp = findPreviousNodes(currentNode, edges, nodes);
            console.log('previousNodesTemp', previousNodesTemp)
            if (previousNodesTemp.length > 1) {
                return;
            }
            setpreviousNodes([...previousNodesTemp]);
            setnextNodes([currentNode]);
            setcurrentNode(previousNodesTemp[0]);
        }
    };

    useEffect(() => {
        document.removeEventListener("keyup", escFunction);
        document.addEventListener("keyup", escFunction);
        return () => {
            document.removeEventListener("keyup", escFunction);
        };
    }, [currentNode.id]);





    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ transition: 0.7 }}
            style={{paddingLeft:props.isDemo==true?"96px":"0px"}}
            className="h-full w-full flex justify-start items-center bg-gradient-to-b from-white to-white/80 text-black/80 overflow-y-hidden">
            <div className="h-full absolute z-10 flex flex-col justify-start items-start py-10 ml-24 text-sm w-64">
                <div className="flex flex-row justify-between items-center w-full"> <b>Next</b> Arrow Down </div>
                <div className="flex flex-row justify-between items-center w-full"> <b>Previous</b> Arrow Up </div>
                <div className="flex flex-row justify-between items-center w-full"> <b>Pivot First Option</b> Arrow Right </div>
                <div className="flex flex-row justify-between items-center w-full"> <b>Pivot Second Option</b> Arrow Left</div>
            </div>

            <div style={{ fontFamily: "Roboto" }} className="md:text-6xl font-medium tracking-tight flex flex-col h-full justify-center items-start w-full">
                <div className="w-3/5 flex flex-col justify-start items-start h-[20%] ml-24">
                    <div className="flex flex-col justify-start items-start gap-4">
                        {
                            currentNode?.data?.value?.split(",").map((line: string, index1: number) => {
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
                                                        key={`${line}-${word}`} >
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
                            nextNodes.length > 1 &&
                            <div className="text-xs tracking-normal text-white bg-black opacity-80 rounded-full px-5 py-2 mt-5">Pivots Available</div>
                        }
                        {
                            nextNodes.length == 0 &&
                            <div className="text-xs tracking-normal text-black bg-yellow-400 opacity-80 rounded-full px-5 py-2 mt-5">End of Call</div>
                        }
                    </div>
                    <NextNodePreview nextNodes={nextNodes} />
                </div>
            </div>
        </motion.div>
    );
}

export default Play;