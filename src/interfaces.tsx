import { Edge, Node, Position } from "reactflow";

export interface User {
  id?: string;
  email: string;
  name: string;
  photoUrl: string;
  plan: "Paid" | "Free";
}


export interface Pivot{
  customerSays:string,
  newMessages:Array<ScriptLine>
}

export interface ScriptLine {
  id?: string;
  text: string;
  pivot?: boolean;
  pivots?:Array<Pivot>;
}



export interface ScriptExperimental {
  id?: string;
  name: string;
  edges: Array<Edge>;
  nodes:Array<Node>
}

export type NodeProps<T = any> = {
  id: string;
  data: NodeDataInterface;
  dragHandle?: boolean;
  type?: string;
  selected?: boolean;
  isConnectable?: boolean;
  zIndex?: number;
  xPos: number;
  yPos: number;
  dragging: boolean;
  targetPosition?: Position;
  sourcePosition?: Position;
};

export interface NodeDataInterface{
  value:string,
  id:string,
  customerSays?:string,
  isPivotStarter?:boolean,
}

