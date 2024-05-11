import { Position } from "reactflow";

export interface User {
  id?: string;
  email: string;
  name: string;
  photoUrl: string;
  plan: "Paid" | "Free";
}

export interface ScriptLine {
  id?: string;
  text: string;
  pivot?: boolean;
  newMessages?: Array<ScriptLine>;
}

export interface Script {
  id?: string;
  name: string;
  lines: Array<ScriptLine>;
}

export type NodeProps<T = any> = {
  id: string;
  data: T;
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