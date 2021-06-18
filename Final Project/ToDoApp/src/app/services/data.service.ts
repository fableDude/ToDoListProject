import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<ToDoItem[]>(this.url+"items?listId="+listId).toPromise();
  }

  getAllItems(){
    return this.http.get<ToDoItem[]>(this.url+"items").toPromise(); 
  }
}
