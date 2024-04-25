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
