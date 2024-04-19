
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Ticket } from "@/interfaces";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaCommentSolid } from "react-icons/lia";
import { CiFileOn } from "react-icons/ci";



const column1 = [
    {
        id: "1",
        title: "Why should you start a startup",
        shortDescription: "The best way to get rich is to start a startup.",
        priority: "Medium",
    } as Ticket,
    {
        id: "3",
        title: "How to talk to users?",
        shortDescription: "Talking to users is the most essential step in building a product.",
        priority: "Medium",
    } as Ticket,
    {
        id: "4",
        title: "How to find a Co-founder?",
        shortDescription: "Finding a co-founder can be a pivotal step in your startup journey.",
        priority: "Low",
    } as Ticket,
    {
        id: "5",
        title: "How to get your first 10 customers",
        shortDescription: "Getting your first 10 customers is the hardest part of building a startup.",
        priority: "Low",
    } as Ticket,
]


const column2 = [
    {
        id: "2",
        title: "Validating Product Idea",
        shortDescription: "How to validate your product idea before building",
        priority: "High",
    } as Ticket
]


const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));



const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});






export default function KanbanBoard(props: { setticketDetailsPopup: (arg0: boolean) => void }) {
    const [state, setState] = useState([column1, column2, []]);

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState);
        }
    }



    return (
        <div className="relative h-full w-full mt-10 overflow-x-auto ">

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex justify-start items-start gap-5 flex-row w-full h-full ">

                    {state.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (

                                <div id="no_scroll" className="h-full w-96">

                                    <div style={{ fontFamily: "Inter" }} className={`text-sm flex flex-row justify-start items-center sticky font-semibold tracking-tight w-full bg-white/80 text-black rounded-t-md p-3`}>
                                        <div className={`h-2 w-2 rounded-full mr-3 ${ind == 0 ? "bg-[#5030E5]" : ind == 1 ? "bg-[#FFA500]" : "bg-blue-600"} `}></div>
                                        {ind == 0 ? "To Do" : ind == 1 ? "In Progress" : "Complete"}
                                        <div className="ml-2 rounded-full w-min px-2 py-[2px] bg-black/10 shadow-sm text-black/90 text-[10px]">{el.length}</div>
                                    </div>

                                    <div className="w-full h-[4px] px-2 bg-white/80">
                                        <div className={`w-full h-full rounded-full ${ind == 0 ? "bg-[#5030E5] text-black/80" : ind == 1 ? "bg-[#FFA500]/80 text-black/80" : "bg-blue-600/80 text-white/90"} `}></div>
                                    </div>

                                    <div
                                        id="no_scroll"
                                        className={`w-72 md:w-96 h-[90%] overflow-y-auto flex-none  rounded-b-md px-4 py-3 bg-white/80 flex flex-col justify-start item-start`}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >


                                        {el.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white/90 rounded-md flex-col my-1 px-3 py-3 gap-1 flex justify-start items-center text-start text-black/80"
                                                    >

                                                        <div className="flex justify-start items-start w-full mb-2">
                                                            <div className={`px-4 py-1 text-[10px] ${item.priority == "Low" ? "bg-blue-600/10 text-blue-600" : item.priority == "Medium" ? "bg-yellow-500/10 text-yellow-500" : "bg-[#D20062]/10 text-[#D20062]"} rounded-sm`}>{item.priority}</div>
                                                        </div>

                                                        <div className="flex flex-row justify-start items-center gap-3 h-full w-full">
                                                            {/* <RxHamburgerMenu size={15} fontSize={20} className="flex flex-none" /> */}

                                                            <button onClick={() => { props.setticketDetailsPopup(true) }} className="text-start flex flex-col justify-start items-start">

                                                                <div className="text-md tracking-tight hover:underline text-start font-medium text-black/80">{item.title}</div>
                                                                <div className="text-sm tracking-tight font-medium text-black/60">{item.shortDescription}</div>
                                                                {/* Need to add comments here */}
                                                            </button>
                                                        </div>

                                                        <div className="flex flex-row justify-end items-center w-full gap-0 mt-1">
                                                            <LiaCommentSolid />

                                                            <div className="text-xs text-black/60 ml-1">1 Comment</div>
                                                            <CiFileOn className="ml-3" />
                                                            <div className="text-xs text-black/60 ml-1">1 Video</div>

                                                        </div>

                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div></div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}

