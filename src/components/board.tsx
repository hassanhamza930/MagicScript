import { Ticket, Comment } from "@/interfaces";
import CourseCanvasList from "./list";
import { Timestamp } from "firebase/firestore";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useState } from "react";

function CourseCanvasBoard() {
  return (
    <div>
      {/* Need to add the Kanban board here with the logic of local data management and sorting using the react dnd library. */}
    </div>
  );
}

export default CourseCanvasBoard;
