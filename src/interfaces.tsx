import { Timestamp } from "firebase/firestore";
import { Edge, Node } from "reactflow";

export interface User {
  id?: string;
  email: string;
  name: string;
  photoUrl: string;
  plan: "Paid" | "Free";
}

export type ScriptType = {
  id: string;
  title: string;
  createdAt: Timestamp;
};

export type ScriptNodeType = Node & {
  readonly scriptId: string;
};

export type ScriptEdgeType = Edge & {
  readonly scriptId: string;
};
