import { Timestamp } from "firebase/firestore";



export interface User{
  id?:string;
  email:string;
  name:string;
  photoUrl:string;
  plan:"Paid"| "Free";
}