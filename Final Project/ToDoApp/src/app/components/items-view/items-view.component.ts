import { Component, Input, OnInit } from '@angular/core';
import { toUnicode } from 'punycode';
import { ToDoItem } from 'src/app/models/todo-item.model';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {
  
  items:ToDoItem[] = [
    {caption:"item 1", id:0, isComplited:false, listId:0},
    {caption:"item 2", id:1, isComplited:true, listId:0},
    {caption:"item 3", id:2, isComplited:true, listId:0},
    {caption:"item 1 list 2", id:0,isComplited:false, listId:1}
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
  checkItem(itemId:number ,listId:number):void {
   let item = this.items.find(item=>item.id===itemId && item.listId===listId);
    if(item !== undefined){
      this.items[this.items.indexOf(item)].isComplited=true;
    }
  }
    
}
