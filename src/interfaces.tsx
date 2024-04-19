import { Timestamp } from "firebase/firestore";

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export interface Comment {
  id?: string;
  content: string;
  date: Timestamp;
  commentorId: string;
  commentorName: string;
  commentorProfilePicture: string;
  ticketId: string;
}

export interface Ticket {
  id?: string;
  title: string;
  shortDescription: string;
  description: string;
  listId: string;
  priority: "High" | "Medium" | "Low";
  dueDate: Timestamp;
  comments: Array<Comment>;
  videoLink?: string;
}

export interface CourseCanvasList {
  id: string;
  name: string;
  isCompleteList: boolean;
}
