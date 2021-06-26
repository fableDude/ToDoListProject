import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { ToDoItem } from '../models/todo-item.model';
import { ToDoList } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url ="http://localhost:5000/"

  constructor(private http: HttpClient) { }
  getListById(id:string){
      return this.http.get<ToDoList>(this.url+"ToDoLists/"+id).toPromise();
  }

  getAllLists(){
    return this.http.get<ToDoList[]>(this.url+"ToDoLists").toPromise();
  }

  getListItems(listId:string){
    if(listId){
      return this.http.get<ToDoItem[]>(this.url+"ToDoItems/bylist/"+listId).toPromise();
    }
    return this.getAllItems();
  }

  getAllItems(){
    return this.http.get<ToDoItem[]>(this.url+"ToDoItems").toPromise(); 
  }

  addNewItem(item:ToDoItem){
    return this.http.post<ToDoItem>(this.url+"ToDoItems",item).toPromise();
  }

  addNewList(list:ToDoList){
    return this.http.post<ToDoList>(this.url+"ToDoLists",list).toPromise();
  }

  updateList(list:ToDoList){
    return this.http.patch<ToDoList>(this.url+"ToDoLists/"+list.id,list).toPromise();
  }

  deleteList(listId:number){
    this.http.delete(this.url+"ToDoItems?listId="+listId);
    return this.http.delete(this.url+"ToDoLists/"+listId).toPromise();
  }

  checkItem(itemId:string){
    let patch = {isComplited:true};   
    return this.http.patch(this.url+"ToDoItems/"+itemId,patch).toPromise();
  }

  countLists():Promise<number>{
    return this.http.get<number>(this.url+"ToDoLists/count").pipe(
      map(list => list)
    ).toPromise();
  }

  countItems():Promise<number>{
    return this.http.get<number>(this.url+"ToDoItems/count").pipe(
      map(item => item)
    ).toPromise();
    
  }

  countActiveItems():Promise<number>{
    return this.http.get<number>(this.url+"ToDoItems/count/active").pipe(
      map(item => item)
    ).toPromise();
  }
}
