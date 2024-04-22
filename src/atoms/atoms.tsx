import { User } from "@/interfaces";
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