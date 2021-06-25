import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { ToDoItem } from '../models/todo-item.model';
import { ToDoList } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url ="http://localhost:3000/"

  constructor(private http: HttpClient) { }
  getListById(id:string){
      return this.http.get<ToDoList>(this.url+"lists/"+id).toPromise();
  }

  getAllLists(){
    return this.http.get<ToDoList[]>(this.url+"lists").toPromise();
  }

  getListItems(listId:string){
    if(listId){
      return this.http.get<ToDoItem[]>(this.url+"items?listId="+listId).toPromise();
    }
    return this.getAllItems();
  }

  getAllItems(){
    return this.http.get<ToDoItem[]>(this.url+"items").toPromise(); 
  }

  addNewItem(item:ToDoItem){
    return this.http.post<ToDoItem>(this.url+"items",item).toPromise();
  }

  addNewList(list:ToDoList){
    return this.http.post<ToDoList>(this.url+"lists",list).toPromise();
  }

  updateList(list:ToDoList){
    return this.http.patch<ToDoList>(this.url+"lists/"+list.id,list).toPromise();
  }

  deleteList(listId:number){
    this.http.delete(this.url+"items?listId="+listId);
    return this.http.delete(this.url+"lists/"+listId).toPromise();
  }

  checkItem(itemId:string){
    return this.http.patch(this.url+"items/"+itemId,{"isComplited":true}).toPromise();
  }

  countLists():Promise<number>{
    return this.http.get<ToDoList[]>(this.url+"lists").pipe(
      map(list => list.length)
    ).toPromise();
  }

  countItems():Promise<number>{
    return this.http.get<ToDoItem[]>(this.url+"items").pipe(
      map(item => item.length)
    ).toPromise();
    
  }

  countActiveItems():Promise<number>{
    return this.http.get<ToDoItem[]>(this.url+"items").pipe(
      map(item => item.filter(i => !i.isComplited)),
      map(item => item.length)
    ).toPromise();
  }
}
