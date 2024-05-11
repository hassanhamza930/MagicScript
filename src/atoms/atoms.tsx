import { User } from "@/interfaces";
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
        {
            id: '1',
            data: { value:"Hello this is the first input" },
            position: { x: 0, y: 0,id:"1" },
            type: 'inputNode',
        },
        {
            id: '2',
            data: { label: 'World',id:"2",x:100,y:100,value:"Checkig if this would work" },
            position: { x: 0, y: 200 },
            type:"inputNode"
        },
    ] as Array<Node>    
})


export const edgesAtom=atom({
    key:"edgesAtom",
    default: [
        {
            id:"edge1-2",
            source:"1",
            target:'2'
        }
    ] as Array<Edge>    
})


export const tipAtom=atom({
    key:"tipAtom",
    default:""
})