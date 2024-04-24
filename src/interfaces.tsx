import { Timestamp } from "firebase/firestore";

export interface User {
  id?: string;
  email: string;
  name: string;
  photoUrl: string;
  plan: "Paid" | "Free";
}

export interface ScriptLine {
  text: string;
  pivot?: boolean;
  newMessages?: Array<ScriptLine>;
}

export interface Script {
  id?: string;
  name: string;
  lines: Array<ScriptLine>;
}

export interface ScriptType {
  id?: string;
  name: string;
  createdAt: Timestamp;
  // scripts: Array<Script>;
}

export interface NodeType {
  id?: string;
  text: string;
  nextNodeId?: string;
  prevNodeId: string;
  pivotNodeId?: string;
}
