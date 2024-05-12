import { NodeDataInterface, User } from "@/interfaces";
import { Edge, Node } from "reactflow";
import { atom } from "recoil";

export const indexAtom=atom({
    key:"indexState",
    default: 0 as number
})


export const isLoadingAtom=atom({
    key:"isLoadingAtom",
    default: false as boolean
})


export const currentUserAtom=atom({
    key:"currentUserAtom",
    default: {} as User
})



export const nodesAtom=atom({
    key:"nodesAtom",
    default: [
    ] as Array<Node>    
})


export const edgesAtom=atom({
    key:"edgesAtom",
    default: [
    ] as Array<Edge>    
})


export const tipAtom=atom({
    key:"tipAtom",
    default:""
})


export const currentNodeAtom=atom({
    key:"currentNodeAtom",
    default:{} as Node
})

export const nextNodesAtom=atom({
    key:"nextNodesAtom",
    default:[] as Array<Node>
})

export const previousNodesAtom=atom({
    key:"previousNodesAtom",
    default:[] as Array<Node>
})