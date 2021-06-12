import { Component, Input, OnInit } from '@angular/core';
import { ToDoList } from 'src/app/models/todo-list.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists:ToDoList[]=[
    {icon:"check", color:"red",caption:"1",description:"1",id:0},
    {icon:"star", color:"blue",caption:"2",description:"1",id:0},
    {icon:"shopping_cart", color:"violet",caption:"3",description:"1",id:0},
    {icon:"circle", color:"yellow",caption:"4",description:"1",id:0},

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
