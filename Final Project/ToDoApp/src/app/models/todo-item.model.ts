export interface ToDoItem{
    id:number;
    caption:string;
    listId:number;
    isCompleted:boolean;
    userId:string|undefined;
}