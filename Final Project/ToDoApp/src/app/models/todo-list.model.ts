import { Rgb } from "./types";

export interface ToDoList{
    id:number;
    caption:string;
    description:string;
    image_url:string;
    color:Rgb;
}